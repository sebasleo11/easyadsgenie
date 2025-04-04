
import React, { useState, useEffect } from 'react';
import { Bot, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAssistant } from '@/contexts/AssistantContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SebaBotProps {
  category: string;
  triggerPoint: string;
  onClose?: () => void;
}

const SebaBot: React.FC<SebaBotProps> = ({ category, triggerPoint, onClose }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { isEnabled, showMessage } = useAssistant();
  const { toast } = useToast();

  useEffect(() => {
    const loadMessage = async () => {
      if (!isEnabled) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setHasError(false);
        
        const assistantMessage = await showMessage(category, triggerPoint);
        
        if (assistantMessage) {
          setMessage(assistantMessage);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error loading SebaBot message:', error);
        setHasError(true);
        toast({
          title: "Error",
          description: "No se pudo cargar el mensaje del asistente. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMessage();
  }, [category, triggerPoint, isEnabled, showMessage, toast]);

  const handleFeedback = (isPositive: boolean) => {
    try {
      // Here you could send the feedback to your analytics or tracking system
      console.log(`User feedback for ${category}/${triggerPoint}: ${isPositive ? 'positive' : 'negative'}`);
      setFeedbackSubmitted(true);
      toast({
        title: "¡Gracias!",
        description: "Tu feedback ha sido registrado.",
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar tu feedback. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleRetry = async () => {
    const loadMessage = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        const assistantMessage = await showMessage(category, triggerPoint);
        
        if (assistantMessage) {
          setMessage(assistantMessage);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('Error loading SebaBot message:', error);
        setHasError(true);
        toast({
          title: "Error",
          description: "No se pudo cargar el mensaje del asistente. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMessage();
  };

  if (!isVisible || !message || !isEnabled) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-md">
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader className="bg-primary/10 p-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-primary flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>SebaBot</span>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <p>Cargando...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-md">
        <Card className="border-2 border-primary shadow-lg">
          <CardHeader className="bg-primary/10 p-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-primary flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span>SebaBot</span>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 rounded-full"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <p>No se pudo cargar el mensaje del asistente.</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-2"
              onClick={handleRetry}
            >
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card className="border-2 border-primary shadow-lg">
        <CardHeader className="bg-primary/10 p-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-primary flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>SebaBot</span>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <p>{message}</p>
        </CardContent>
        {!feedbackSubmitted && (
          <CardFooter className="flex justify-end space-x-2 p-3 pt-0">
            <span className="text-sm text-gray-500 mr-2">¿Fue útil?</span>
            <Button variant="ghost" size="sm" onClick={() => handleFeedback(true)}>
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleFeedback(false)}>
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </CardFooter>
        )}
        {feedbackSubmitted && (
          <CardFooter className="p-3 pt-0">
            <p className="text-sm text-gray-500">Gracias por tu feedback</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default SebaBot;
