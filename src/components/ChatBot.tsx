
import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const responses = [
      "C'est une excellente question ! Laissez-moi réfléchir à cela...",
      "Je comprends votre demande. Voici ce que je peux vous dire...",
      "Intéressant ! Basé sur votre question, je pense que...",
      "Merci pour votre question. Voici ma réponse...",
      "C'est un sujet fascinant ! Permettez-moi de vous expliquer...",
    ];
    
    if (userMessage.toLowerCase().includes('bonjour') || userMessage.toLowerCase().includes('salut')) {
      return "Bonjour ! Ravi de vous rencontrer. Comment puis-je vous aider aujourd'hui ?";
    }
    
    if (userMessage.toLowerCase().includes('merci')) {
      return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.";
    }
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           "En tant qu'IA, je suis conçu pour vous aider avec diverses tâches et répondre à vos questions de manière utile et précise.";
  };

  const handleSendMessage = async (messageText: string) => {
    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simuler un délai de réponse du bot
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000); // Délai aléatoire entre 1-3 secondes
  };

  return (
    <div className="h-screen bg-gradient-cyber flex flex-col">
      <Header />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-cyber-green to-cyber-cyan">
                <div className="w-5 h-5 bg-black rounded-full animate-pulse"></div>
              </div>
              <div className="bg-cyber-gray border border-cyber-green/20 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatBot;
