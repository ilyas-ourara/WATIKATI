import React, { useState } from "react";
import ChatBot from "./ChatBot";
import logo from "../images/logo.png";

const HomePage = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <ChatBot />;
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-cyber-darker via-cyber-gray to-cyber-green flex flex-col">
      {/* Logo en haut à gauche */}
      <div className="flex items-center p-6">
        <img src={logo} alt="Logo" className="h-12 w-12 object-contain rounded-lg bg-white" />
      </div>
      {/* Contenu centré */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-white mb-8 animate-bounce">أهلاً! عندك شي سؤال؟ كليكي على الزر لتحت ومرحبا!</h1>
        <button
          onClick={() => setShowChat(true)}
          className="px-8 py-4 bg-cyber-green text-black font-bold rounded-2xl text-xl shadow-lg hover:bg-cyber-cyan transition"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default HomePage;