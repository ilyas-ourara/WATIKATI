
import React from 'react';

const Header = () => {
  return (
    <header className="bg-cyber-darker border-b border-cyber-gray px-6 py-4">
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-green rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">WATI</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">HackAI Chat</h1>
            <p className="text-cyber-green text-sm">Assistant IA Intelligent</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
