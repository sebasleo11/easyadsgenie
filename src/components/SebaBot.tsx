import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SebaBot.css';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const SebaBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '¡Hola! Soy SebaBot, ¿en qué puedo ayudarte hoy?', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: 'Gracias por tu mensaje. Estoy aquí para ayudarte.',
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-gray-100 rounded-full cursor-pointer shadow-lg seba-bot-robot-head"
            onClick={() => setIsOpen(true)}
          >
            {/* Robot Head Design */}
            <div className="relative w-full h-full">
              {/* Eyes */}
              <div className="absolute top-4 left-4 w-4 h-4 bg-blue-500 rounded-full robot-eye"></div>
              <div className="absolute top-4 right-4 w-4 h-4 bg-blue-500 rounded-full robot-eye"></div>
              {/* Mouth */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden seba-bot-chat-enter"
          >
            {/* Chat Interface */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
                <h3 className="font-semibold">SebaBot</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg max-w-[80%] ${
                        message.isUser
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-blue-100'
                      }`}
                    >
                      {message.text}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SebaBot;
