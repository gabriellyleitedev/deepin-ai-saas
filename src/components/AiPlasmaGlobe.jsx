import React from 'react';
import aiCoreImage from '../assets/ai.plasma.png';

export default function AiPlasmaGlobe({ isResponding = false }) {
  return (
    <div className="relative md:w-50 md:h-50 w-36 h-36 flex items-center justify-center select-none overflow-visible">

      <div
        className={`absolute w-72 h-72 rounded-full blur-[60px] pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isResponding
          ? "scale-105 bg-linear-to-tr from-cyan-500/30 via-fuchsia-500/20 to-purple-500/20 opacity-100"
          : "scale-95 bg-linear-to-tr from-purple-600/15 via-indigo-500/5 to-transparent opacity-40 animate-pulse"
          }`}
        style={{ animationDuration: '4s' }}
      />

      {/* GLOBO EM SVG */}
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isResponding ? "scale-[1.02]" : ""
          }`}
      >
        <defs>
          {/* Máscara pra manter o formato esférico do globo */}
          <clipPath id="plasmaBoundary">
            <circle cx="100" cy="100" r="75" />
          </clipPath>

          {/* Filtro líquido otimizado para não perder a qualidade do globo */}
          <filter id="liquidRefraction" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={isResponding ? "0.02" : "0.01"}
              numOctaves="2"
              result="noise"
            >
              {/* Importante:
      o operador ternário no 'dur' para acelerar a animação quando responde,
      e um 'repeatCount' condicional. Se 'isResponding' for falso, 
      o repeatCount vira '0', o que desliga o loop de cálculo da CPU rapidamente */}
              <animate
                attributeName="baseFrequency"
                values={isResponding ? "0.018;0.025;0.018" : "0.009;0.009;0.009"}
                dur={isResponding ? "5s" : "1s"}
                repeatCount={isResponding ? "indefinite" : "0"}
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isResponding ? "24" : "10"}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Sombra de volume 3D (Efeito Fresnel) */}
          <radialGradient id="fresnelShading" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="#000000" stopOpacity="0" />
            <stop offset="94%" stopColor="#05020a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
          </radialGradient>

          {/* Contra-luz ciano inferior */}
          <linearGradient id="bottomRimLight" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Gradiente do reflexo do vidro */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* CAMADA 1: Fundo Escuro Base */}
        <circle cx="100" cy="100" r="75" fill="#040207" />

        {/* MÁSCARA ÓPTICA */}
        <g clipPath="url(#plasmaBoundary)">

          {/* CAMADA 2: Imagem com deformação suave */}
          <image
            href={aiCoreImage}
            x="22"
            y="22"
            width="156"
            height="156"
            preserveAspectRatio="xMidYMid slice"
            filter="url(#liquidRefraction)"
            className="origin-center transition-transform duration-1000 ease-in-out"
            style={{
              transform: isResponding ? 'scale(1.08) rotate(4deg)' : 'scale(1.01) rotate(0deg)'
            }}
          />

          {/* CAMADA 3: Sombra de Esfericidade por cima da imagem */}
          <circle cx="100" cy="100" r="75" fill="url(#fresnelShading)" />
        </g>

        {/* CAMADA 4: Acabamento do Vidro */}
        <circle cx="100" cy="100" r="75" fill="none" stroke="#000000" strokeWidth="1.5" opacity="0.8" />
        <circle cx="100" cy="100" r="74.2" fill="none" stroke="url(#bottomRimLight)" strokeWidth="1.2" />

        {/* CAMADA 5: Reflexo Cristalino */}
        <path
          d="M 31,78 A 69,69 0 0 1 169,78 A 69,28 0 0 0 31,78 Z"
          fill="url(#glassReflection)"
        />

        {/* CAMADA 6: Ponto de luz secundário */}
        <circle cx="138" cy="144" r="1.2" fill="#ffffff" opacity="0.15" />
      </svg>
    </div>
  );
}