import React from 'react';

export default function AiGlobe({ isResponding = false }) {
  return (
    <div className="relative w-72 h-72 flex items-center justify-center select-none">
      
      {/* 1. GLOW VOLUMÉTRICO TRASEIRO (Aura ambiente que se expande organicamente) */}
      <div 
        className={`absolute w-64 h-64 blur-[65px] rounded-full pointer-events-none transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 ${
          isResponding 
            ? "scale-110 bg-linear-to-tr from-cyan-500/30 via-fuchsia-500/25 to-purple-500/35 opacity-100" 
            : "scale-95 bg-linear-to-tr from-purple-600/15 via-indigo-500/5 to-transparent opacity-40 animate-pulse"
        }`} 
        style={{ animationDuration: '4s' }} 
      />

      {/* 2. ESTRUTURA DA ESFERA 3D */}
      <svg 
        viewBox="0 0 200 200" 
        className={`w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-transform cubic-bezier(0.16, 1, 0.3, 1) duration-700 ${
          isResponding ? "scale-[1.03]" : ""
        }`}
      >
        <defs>
          {/* Clip de contenção física perfeita */}
          <clipPath id="globeBoundary">
            <circle cx="100" cy="100" r="72" />
          </clipPath>

          {/* PALETA RESTRITA E PROFUNDA (Gradiente volumétrico com ponto focal deslocado para noroeste) */}
          <radialGradient id="deepinCoreGlow" cx="38%" cy="34%" r="68%" fx="30%" fy="25%">
            <stop offset="0%" stopColor="#d8b4fe" stopOpacity="1" />     {/* Ponto quente interno */}
            <stop offset="18%" stopColor="#a855f7" stopOpacity="0.95" /> {/* Roxo assinatura */}
            <stop offset="55%" stopColor="#3730a3" stopOpacity="0.9" />  {/* Índigo crepuscular */}
            <stop offset="88%" stopColor="#0b0f19" stopOpacity="0.85" /> {/* Queda de luz de borda */}
            <stop offset="100%" stopColor="#020408" stopOpacity="1" />
          </radialGradient>

          {/* GRADIENTE REATIVO DE PLASMA (Fusão de alta temperatura para o estado ativo) */}
          <radialGradient id="deepinResponseGlow" cx="45%" cy="42%" r="72%" fx="40%" fy="35%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />     {/* Núcleo de processamento */}
            <stop offset="35%" stopColor="#df49a6" stopOpacity="0.95" /> {/* Transição de refração */}
            <stop offset="70%" stopColor="#4f46e5" stopOpacity="0.9" />  {/* Base estável */}
            <stop offset="100%" stopColor="#05030a" stopOpacity="1" />
          </radialGradient>

          {/* REFLEXOS DE CURVATURA DA LENTE (Efeito Vidro Convexo) */}
          <linearGradient id="lensReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* CONTRA-LUZ DA QUINA INFERIOR (Rim Light de estúdio fotográfico) */}
          <linearGradient id="rimLight" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />   {/* Rebatimento ciano sutil */}
            <stop offset="45%" stopColor="#a855f7" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* FILTRO DE ENERGIA ORGÂNICA (Simula refração fluida dentro do domo) */}
          <filter id="organicFluid" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={isResponding ? "24" : "12"} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* CAMADA 1: Base de Oclusão (Garante que nenhum brilho vase ao fundo) */}
        <circle cx="100" cy="100" r="72" fill="#020408" />

        {/* --- CONTEÚDO ENCAPSULADO DENTRO DO VIDRO --- */}
        <g clipPath="url(#globeBoundary)">
          
          {/* CAMADA 2: Corpo de Plasma Base */}
          <circle 
            cx="100" 
            cy="100" 
            r="72" 
            fill={`url(#${isResponding ? "deepinResponseGlow" : "deepinCoreGlow"})`} 
            className="transition-all duration-1000 ease-in-out"
          />

          {/* CAMADA 3: ENERGIA FLUIDA REFRATADA (Fluxos tridimensionais assimétricos) */}
          <g filter="url(#organicFluid)" opacity={isResponding ? "0.8" : "0.45"} className="mix-blend-screen">
            {/* Onda Convexa Superior */}
            <path d="M 15,90 Q 100,20 185,90 Q 100,140 15,90 Z" fill="url(#lensReflection)" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur={isResponding ? "4s" : "12s"} repeatCount="indefinite" />
            </path>
            
            {/* Onda de Contra-Fluxo Inferior */}
            <path d="M 30,110 Q 100,160 170,110 Q 100,70 30,110 Z" fill={`url(#${isResponding ? "deepinCoreGlow" : "deepinResponseGlow"})`} opacity="0.5">
              <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur={isResponding ? "5s" : "16s"} repeatCount="indefinite" />
            </path>
          </g>

          {/* Vínculo de Sombra Periférica (Efeito Fresnel interno para dar peso e volume) */}
          <circle cx="100" cy="100" r="72" fill="none" stroke="#020408" strokeWidth="10" opacity="0.5" />
        </g>
        {/* --- FIM DO CONTEÚDO ENCAPSULADO --- */}

        {/* CAMADA 4: TRATAMENTO DE SUPERFÍCIE ÓPTICA (O efeito "Bola de Cristal") */}
        {/* Sombra de contorno externa cirúrgica */}
        <circle cx="100" cy="100" r="72" fill="none" stroke="#000000" strokeWidth="2" opacity="0.85" />
        
        {/* Brilho de Contra-luz Inferior */}
        <circle cx="100" cy="100" r="71.2" fill="none" stroke="url(#rimLight)" strokeWidth="1.5" />
        
        {/* Micro-borda de luz branca superior incidente */}
        <circle cx="100" cy="100" r="71.5" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />

        {/* CAMADA 5: Calota Reflexiva Superior (Simula a curvatura externa capturando luz ambiente) */}
        <path 
          d="M 35,80 A 65,65 0 0 1 165,80 A 65,30 0 0 0 35,80 Z" 
          fill="url(#lensReflection)" 
          opacity="0.85"
        />

        {/* CAMADA 6: HIGHLIGHT SPECULAR (O ponto crucial de realismo tridimensional) */}
        {/* Brilho secundário suave/difuso de fundo */}
        <circle cx="66" cy="50" r="5" fill="#ffffff" opacity="0.25" filter="blur(1px)" />
        {/* Ponto focal principal de reflexo de luz direta */}
        <circle cx="65" cy="49" r="3.5" fill="#ffffff" opacity="0.75" />
        <circle cx="65" cy="49" r="1.5" fill="#ffffff" opacity="0.95" />
        
        {/* Pequeno rebatimento secundário no quadrante oposto (Luz ambiente residencial) */}
        <circle cx="136" cy="144" r="1.5" fill="#ffffff" opacity="0.2" />
      </svg>
    </div>
  );
}