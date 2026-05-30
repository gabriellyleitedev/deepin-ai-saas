import React from 'react';
// Importa a sua nova imagem dos assets
import aiCoreImage from '../assets/ai.plasma.png';

export default function AiPlasmaGlobe({ isResponding = false }) {
  return (
    <div className="relative w-52 h-52 flex items-center justify-center select-none overflow-visible">

      <div
        className={`absolute w-52 h-52 rounded-full blur-[90px] pointer-events-none transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 ${isResponding
            ? "scale-110 bg-linear-to-tr from-cyan-500/40 via-fuchsia-500/30 to-amber-500/30 opacity-100"
            : "scale-95 bg-linear-to-tr from-purple-600/20 via-indigo-500/10 to-transparent opacity-40 animate-pulse"
          }`}
        style={{ animationDuration: '3.5s' }}
      />

      {/* 2. CONTENÇÃO DO GLOBO EM SVG */}
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] transition-transform cubic-bezier(0.16, 1, 0.3, 1) duration-700 ${isResponding ? "scale-[1.03]" : ""
          }`}
      >
        <defs>
          {/* Garante o formato esférico perfeito */}
          <clipPath id="plasmaBoundary">
            <circle cx="100" cy="100" r="75" />
          </clipPath>

          {/* Ele deforma a imagem sutilmente e acelera quando a IA responde 
          <filter id="liquidRefraction" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={isResponding ? "0.025" : "0.012"}
              numOctaves="3"
              result="noise"
            >
              {/* Animação contínua da onda de choque interna 
              <animate
                attributeName="baseFrequency"
                values={isResponding ? "0.02;0.03;0.02" : "0.011;0.013;0.011"}
                dur={isResponding ? "4s" : "8s"}
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isResponding ? "35" : "14"}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Sombra de contorno interno */}
          <radialGradient id="fresnelShading" cx="50%" cy="50%" r="50%">
            <stop offset="75%" stopColor="#000000" stopOpacity="0" />
            <stop offset="93%" stopColor="#05020a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </radialGradient>


          {/* Contra-luz inferior ciano  */}
          <linearGradient id="bottomRimLight" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* CAMADA 1: Base de fundo escuro  */}
        <circle cx="100" cy="100" r="75" fill="#030206" />

        {/* CONTEÚDO DA IMAGEM (ENCAPSULADO NO VIDRO) */}
        <g clipPath="url(#plasmaBoundary)">

          {/* CAMADA 2: Imagem com o filtro líquido aplicado */}
          <image
            href={aiCoreImage}
            x="20"
            y="20"
            width="160"
            height="160"
            preserveAspectRatio="xMidYMid slice"
            filter="url(#liquidRefraction)"
            className="origin-center transition-all duration-1000 ease-in-out"
            style={{
              transform: isResponding ? 'scale(1.1) rotate(3deg)' : 'scale(1.02) rotate(0deg)'
            }}
          />

          {/* CAMADA 3: Esfericidade (Sombra radial que dá volume 3D por cima da imagem) */}
          <circle cx="100" cy="100" r="75" fill="url(#fresnelShading)" />
        </g>
        {/* --- FIM DO CONTEÚDO ENCAPSULADO --- */}


        {/* Contorno físico escuro da lente */}
        <circle cx="100" cy="100" r="75" fill="none" stroke="#000000" strokeWidth="2" opacity="0.9" />

        {/* Brilho inferior de contra-luz */}
        <circle cx="100" cy="100" r="74.2" fill="none" stroke="url(#bottomRimLight)" strokeWidth="1.5" />

        {/* Micro-linha de luz incidente no topo */}
        <circle cx="100" cy="100" r="74.6" fill="none" stroke="#000000" strokeWidth="0.6" opacity="0.35" />

        {/* CAMADA 5: Calota de Reflexo Curvo Convexo */}
        <path
          d="M 31,80 A 69,69 0 0 1 169,80 A 69,32 0 0 0 31,80 Z"
          fill="url(#glassReflection)"
          opacity="0.8"
        />

        {/* Contra-reflexo */}
        <circle cx="138" cy="146" r="1.5" fill="#ffffff" opacity="0.2" />
      </svg>
    </div>
  );
}