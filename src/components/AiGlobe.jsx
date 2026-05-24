import React from 'react';

export default function AiGlobe({ isResponding = false }) {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center select-none">
      
      {/* NÉVOA DE GLOW DEEPIN TRASEIRA (Aura de energia que pulsa ao fundo) */}
      <div className={`absolute w-60 h-60 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none transition-all cubic-bezier(0.4, 0, 0.2, 1) duration-1000 ${
        isResponding ? "scale-125 bg-cyan-500/40 opacity-80" : "scale-100 opacity-40 animate-pulse"
      }`} style={{ animationDuration: '4s' }} />

      {/* ESFERA COMPLETA */}
      <svg 
        viewBox="0 0 200 200" 
        className={`w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-transform duration-700 ${
          isResponding ? "scale-105" : ""
        }`}
      >
        <defs>
          {/* PALETA DEEPIN DEFINITIVA: Centro Roxo, transição em Índigo e borda interna em Ciano */}
          <radialGradient id="deepinCoreGlow" cx="50%" cy="50%" r="50%" fx="42%" fy="42%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.95" /> {/* Roxo Elétrico Deepin */}
            <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.8" />  {/* Índigo Profundo */}
            <stop offset="85%" stopColor="#06b6d4" stopOpacity="0.45" /> {/* Ciano de Contraste Lateral */}
            <stop offset="100%" stopColor="#090d16" stopOpacity="0" />
          </radialGradient>

          {/* GRADIENTE REATIVO: Quando a IA processa/fala, o Ciano explode do centro */}
          <radialGradient id="deepinResponseGlow" cx="45%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" /> {/* Ciano principal */}
            <stop offset="55%" stopColor="#d946ef" stopOpacity="0.8" />  {/* Transição em Fuchsia */}
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>

          {/* REFLEXO DA LENTE SUPERIOR (Vidro curvo) */}
          <linearGradient id="lensReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* LUZ DE REBOUND INFERIOR (Rim light de estúdio) */}
          <linearGradient id="rimLight" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* CAMADA 1: Fundo Sombreado de Absorção Física */}
        <circle cx="100" cy="100" r="70" fill="#090d16" />

        {/* CAMADA 2: O Corpo de Plasma Energético */}
        <circle 
          cx="100" 
          cy="100" 
          r="70" 
          fill={`url(#${isResponding ? "deepinResponseGlow" : "deepinCoreGlow"})`} 
          className="transition-all duration-1000"
        />

        {/* CAMADA 3: O MOTOR JARVIS (Ondas internas de energia fluida cruzada) */}
        {/* Onda Sentido Horário */}
        <path 
          d="M 45,85 Q 90,45 145,75 Q 110,125 45,85 Z" 
          fill="url(#lensReflection)" 
          opacity={isResponding ? "0.4" : "0.15"}
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from="0 100 100" 
            to="360 100 100" 
            dur={isResponding ? "4s" : "14s"} 
            repeatCount="indefinite" 
          />
        </path>
        
        {/* Onda Contraria / Sentido Anti-Horário */}
        <path 
          d="M 55,115 Q 105,145 155,105 Q 120,85 55,115 Z" 
          fill="url(#deepinCoreGlow)" 
          opacity={isResponding ? "0.5" : "0.25"}
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            from="360 100 100" 
            to="0 100 100" 
            dur={isResponding ? "5s" : "20s"} 
            repeatCount="indefinite" 
          />
        </path>

        {/* CAMADA 4: Acabamento de Vidro, Sombras de Borda e Contornos (100% Estáticos) */}
        <circle cx="100" cy="100" r="70" fill="none" stroke="#000000" strokeWidth="5.5" opacity="0.5" />
        <circle cx="100" cy="100" r="69.25" fill="none" stroke="url(#rimLight)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />

        {/* CAMADA 5: Lente Superior Convexa (Garante o visual de bola de cristal do Syntrix) */}
        <path 
          d="M 36,80 A 66,66 0 0 1 164,80 A 66,35 0 0 0 36,80 Z" 
          fill="url(#lensReflection)" 
        />

        {/* CAMADA 6: Ponto Focal de Luz (Specular Highlight) */}
        <circle cx="72" cy="55" r="3.2" fill="#ffffff" opacity="0.7" filter="blur(0.5px)" />
        <circle cx="72" cy="55" r="1.5" fill="#ffffff" opacity="0.9" />
      </svg>

    </div>
  );
}