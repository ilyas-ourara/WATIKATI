
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="bg-cyber-darker border-t border-cyber-gray p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="bg-cyber-gray border-cyber-green/20 text-white placeholder-gray-400 focus:border-cyber-green focus:ring-cyber-green pr-12"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="bg-gradient-to-r from-cyber-green to-cyber-cyan text-black hover:from-cyber-cyan hover:to-cyber-green transition-all duration-300 px-4 py-2 rounded-lg"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
