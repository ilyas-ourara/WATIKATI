import React from 'react';
import logo from '../images/logo.png';

const Header = () => {
  return (
    <header className="bg-cyber-darker border-b border-cyber-gray px-6 py-4">
      <div className="flex items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain rounded-lg bg-white" />
          <div>
            <h1 className="text-xl font-bold text-white">WATIKATI AI</h1>
          
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;