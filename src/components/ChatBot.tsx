import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useThinkingSound } from '../hooks/useThinkingSound';

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
      text: "سلام! أنا المساعد الإداري ديالك، واش كاين شي حاجة نعاونك فيها اليوم؟",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playThinkingSound } = useThinkingSound();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Jouer le son quand le bot commence à réfléchir
  useEffect(() => {
    if (isLoading) {
      playThinkingSound();
    }
  }, [isLoading, playThinkingSound]);

  // Appel à l'API backend pour obtenir la réponse du bot
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

    try {
      // Préparer l'historique pour le backend
      const history = messages.map(m => ({
        role: m.isBot ? "assistant" : "user",
        content: m.text
      }));

      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history: history,
          user_input: messageText
        }),
      });

      const data = await response.json();

      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.reply,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Erreur lors de la communication avec le serveur.",
          isBot: true,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="h-screen w-screen bg-gradient-to-br from-cyber-darker via-cyber-gray to-cyber-green flex flex-col">
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