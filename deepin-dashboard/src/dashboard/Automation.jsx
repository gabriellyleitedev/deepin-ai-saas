import React, { useState } from "react";
import ParticleGlobe from "./components/ParticleGlobe";

export default function Automation() {
   const [isResponding, setIsResponding] = useState(false);

  // Mantém a função caso queira simular a pulsação do Globo clicando na tela ou em testes futuros
  const toggleGlobePulse = () => {
    setIsResponding(true);
    setTimeout(() => {
      setIsResponding(false);
    }, 4000);
  };

  return (

    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-300 font-sans select-none antialiased relative">
        <ParticleGlobe isResponding={isResponding} />
      <div 
        onClick={toggleGlobePulse} 
        className="flex flex-col justify-center items-center cursor-pointer group"
        title="Clique para testar a pulsação do Orbe"
      >
        
        {/* Subtexto minimalista do Globo */}
        <p className="text-zinc-600 text-[10px] tracking-[0.15em] font-mono uppercase mt-8 transition-colors group-hover:text-purple-400">
          {isResponding ? "Analyzing telemetry..." : "System Sandbox Ready"}
        </p>
      </div>

    </div>
   
  );
}