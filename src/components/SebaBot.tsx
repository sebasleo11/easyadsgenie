
import React, { useState, useEffect } from 'react';
import { Bot, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAssistant } from '@/contexts/AssistantContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SebaBotProps {
  category: string;
  triggerPoint: string;
  onClose?: () => void;
}

const SebaBot: React.FC<SebaBotProps> = ({ category, triggerPoint, onClose }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const { isEnabled, showMessage } = useAssistant();

  useEffect(() => {
    const loadMessage = async () => {
      if (!isEnabled) return;
      
      const assistantMessage = await showMessage(category, triggerPoint);
      
      if (assistantMessage) {
        setMessage(assistantMessage);
        setIsVisible(true);
      }
    };

    loadMessage();
  }, [category, triggerPoint, isEnabled, showMessage]);

  const handleFeedback = (isPositive: boolean) => {
    // Here you could send the feedback to your analytics or tracking system
    console.log(`User feedback for ${category}/${triggerPoint}: ${isPositive ? 'positive' : 'negative'}`);
    setFeedbackSubmitted(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible || !message) {
    return null;
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
