
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type AssistantTone = 'formal' | 'casual' | 'motivational';
export type AssistantMode = 'basic' | 'advanced';

interface AssistantResponse {
  id: string;
  category: string;
  mode: AssistantMode;
  tone: AssistantTone;
  trigger_point: string;
  response_text: string;
}

interface UserPreferences {
  assistant_enabled: boolean;
  assistant_mode: AssistantMode;
  assistant_tone: AssistantTone;
}

interface AssistantContextType {
  isEnabled: boolean;
  mode: AssistantMode;
  tone: AssistantTone;
  loading: boolean;
  showMessage: (category: string, triggerPoint: string) => Promise<string>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
}

const defaultPreferences: UserPreferences = {
  assistant_enabled: true,
  assistant_mode: 'basic',
  assistant_tone: 'casual',
};

const AssistantContext = createContext<AssistantContextType | null>(null);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};

export const AssistantProvider = ({ children }: { children: ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(defaultPreferences.assistant_enabled);
  const [mode, setMode] = useState<AssistantMode>(defaultPreferences.assistant_mode);
  const [tone, setTone] = useState<AssistantTone>(defaultPreferences.assistant_tone);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<AssistantResponse[]>([]);

  // Load responses from Supabase
  useEffect(() => {
    const loadResponses = async () => {
      try {
        const { data, error } = await supabase
          .from('assistant_responses')
          .select('*');
        
        if (error) throw error;
        
        if (data) {
          setResponses(data as AssistantResponse[]);
        }
      } catch (error) {
        console.error('Error loading assistant responses:', error);
      }
    };

    loadResponses();
  }, []);

  // Load user preferences
  useEffect(() => {
    const loadUserPreferences = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser();
        
        if (authData?.user) {
          const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', authData.user.id)
            .single();
          
          if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows returned'
            throw error;
          }
          
          if (data) {
            setIsEnabled(data.assistant_enabled);
            setMode(data.assistant_mode);
            setTone(data.assistant_tone);
          }
        }
      } catch (error) {
        console.error('Error loading user preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserPreferences();
  }, []);

  const showMessage = async (category: string, triggerPoint: string): Promise<string> => {
    if (!isEnabled) return '';

    try {
      const filteredResponses = responses.filter(
        (r) => r.category === category && 
               r.trigger_point === triggerPoint && 
               r.mode === mode && 
               r.tone === tone
      );
      
      if (filteredResponses.length > 0) {
        // Return a random response if multiple match the criteria
        const randomIndex = Math.floor(Math.random() * filteredResponses.length);
        return filteredResponses[randomIndex].response_text;
      }
      
      // Fallback to any response with matching category and trigger point
      const fallbackResponses = responses.filter(
        (r) => r.category === category && r.trigger_point === triggerPoint
      );
      
      if (fallbackResponses.length > 0) {
        const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
        return fallbackResponses[randomIndex].response_text;
      }
      
      return '';
    } catch (error) {
      console.error('Error showing assistant message:', error);
      return '';
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      const { data: authData } = await supabase.auth.getUser();
      
      if (!authData?.user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para guardar preferencias.",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      if (preferences.assistant_enabled !== undefined) {
        setIsEnabled(preferences.assistant_enabled);
      }
      
      if (preferences.assistant_mode !== undefined) {
        setMode(preferences.assistant_mode);
      }
      
      if (preferences.assistant_tone !== undefined) {
        setTone(preferences.assistant_tone);
      }
      
      // Save to database
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: authData.user.id,
          assistant_enabled: preferences.assistant_enabled !== undefined 
            ? preferences.assistant_enabled 
            : isEnabled,
          assistant_mode: preferences.assistant_mode !== undefined 
            ? preferences.assistant_mode 
            : mode,
          assistant_tone: preferences.assistant_tone !== undefined 
            ? preferences.assistant_tone 
            : tone,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });
      
      if (error) throw error;
      
      toast({
        title: "Preferencias guardadas",
        description: "Las preferencias del asistente han sido actualizadas.",
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar las preferencias. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const value = {
    isEnabled,
    mode,
    tone,
    loading,
    showMessage,
    updatePreferences,
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
};
