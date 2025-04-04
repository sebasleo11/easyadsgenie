
import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAssistant } from '@/contexts/AssistantContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface SebaBotProps {
  category: string;
  triggerPoint: string;
  onClose?: () => void;
}

const SebaBot: React.FC<SebaBotProps> = ({ category, triggerPoint, onClose }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { isEnabled, showMessage } = useAssistant();
  const { toast } = useToast();
  const botRef = useRef<HTMLDivElement>(null);

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
          // Auto-expand once message is loaded
          setTimeout(() => setIsExpanded(true), 500);
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
    setIsExpanded(false);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Wait for animation to complete
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRetry = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      
      const assistantMessage = await showMessage(category, triggerPoint);
      
      if (assistantMessage) {
        setMessage(assistantMessage);
        setIsVisible(true);
        setIsExpanded(true);
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

  if (!isVisible || !isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={botRef}>
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="max-w-md"
          >
            <Card className="border-2 border-primary shadow-lg overflow-hidden">
              <CardHeader className="bg-primary/10 p-4 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-primary flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>SebaBot</span>
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full hover:bg-primary/20"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cerrar</span>
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                {isLoading ? (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                    <p className="text-sm text-muted-foreground">Cargando...</p>
                  </div>
                ) : hasError ? (
                  <div className="flex flex-col items-center py-2">
                    <p className="text-sm text-destructive mb-2">No se pudo cargar el mensaje del asistente.</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRetry}
                    >
                      Reintentar
                    </Button>
                  </div>
                ) : (
                  <div className="chat-bubble bg-primary/5 p-3 rounded-lg border border-primary/20">
                    <p>{message}</p>
                  </div>
                )}
              </CardContent>
              {!isLoading && !hasError && (
                <CardFooter className="flex justify-end space-x-2 p-3 pt-0">
                  {!feedbackSubmitted ? (
                    <>
                      <span className="text-sm text-gray-500 mr-2">¿Fue útil?</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleFeedback(true)}
                        className="hover:bg-green-100 hover:text-green-600 transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleFeedback(false)}
                        className="hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Gracias por tu feedback</p>
                  )}
                </CardFooter>
              )}
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bot-icon"
            onClick={toggleExpand}
          >
            <Button
              className="rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 p-0 flex items-center justify-center"
            >
              <Bot className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SebaBot;
