
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex items-start space-x-3 mb-6 animate-fade-in ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot 
          ? 'bg-gradient-to-r from-cyber-green to-cyber-cyan' 
          : 'bg-gradient-to-r from-cyber-purple to-pink-500'
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-black" />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      
      <div className={`max-w-[70%] ${isBot ? '' : 'text-right'}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isBot 
            ? 'bg-cyber-gray border border-cyber-green/20 text-white' 
            : 'bg-gradient-to-r from-cyber-purple to-pink-500 text-white'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1 px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
