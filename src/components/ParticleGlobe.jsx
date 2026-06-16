import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleGlobeMesh({ currentState, audioVolume = 0, currentEmotion = 'normal' }) {
  const outerPointsRef = useRef();
  const innerPointsRef = useRef();
  
  const outerCount = 16000; 
  const innerCount = 4000; 
  const baseRadius = 2.3; 

  const physics = useRef({
    speed: 0.25,
    noiseIntensity: 0.14,
    pulse: 1.0,
    audioInfluence: 0.0
  });

  const mouseRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  const [outerPositions, outerColors, outerData] = useMemo(() => {
    const pos = new Float32Array(outerCount * 3);
    const col = new Float32Array(outerCount * 3);
    const data = [];
    for (let i = 0; i < outerCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      pos[i * 3] = baseRadius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = baseRadius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = baseRadius * Math.cos(phi);

      data.push({
        theta, phi,
        speedMultiplier: 0.4 + Math.random() * 0.9,
        personalAmp: (0.02 + Math.random() * 0.07) * (Math.random() > 0.88 ? 2.2 : 1.0),
        phaseX: Math.random() * Math.PI,
        phaseY: Math.random() * Math.PI,
        phaseZ: Math.random() * Math.PI
      });
    }
    return [pos, col, data];
  }, []);

  const [innerPositions, innerColors] = useMemo(() => {
    const pos = new Float32Array(innerCount * 3);
    const col = new Float32Array(innerCount * 3);
    for (let i = 0; i < innerCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const currentInnerRadius = baseRadius * 0.45 * (0.1 + Math.random() * 0.9);
      
      pos[i * 3] = currentInnerRadius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = currentInnerRadius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = currentInnerRadius * Math.cos(phi);
      
      col[i * 3] = 0;
      col[i * 3 + 1] = 0;
      col[i * 3 + 2] = 0;
    }
    return [pos, col];
  }, []);

  // Cores calibradas: Cores do topo ultra saturadas e base prata brilhante fixa
  const emotionColors = {
    normal: { top: '#A3E635', bottom: '#DCE2E6', coreLight: '#A3E635' },   
    alert: { top: '#FF6A00', bottom: '#DCE2E6', coreLight: '#FF6A00' }   
  };

  useFrame((state) => {
    if (!outerPointsRef.current || !innerPointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const outPos = outerPointsRef.current.geometry.attributes.position.array;
    const outCol = outerPointsRef.current.geometry.attributes.color.array;
    const innCol = innerPointsRef.current.geometry.attributes.color.array;

    const activeColor = emotionColors[currentEmotion] || emotionColors.normal;
    const cTop = new THREE.Color(activeColor.top);
    const cBottom = new THREE.Color(activeColor.bottom);
    const cCore = new THREE.Color(activeColor.coreLight);

    // SISTEMA DE INTERPOLAÇÃO DE RETORNO (Vira com o mouse e reseta pro centro)
    if (state.pointer.x === 0 && state.pointer.y === 0) {
      targetRotation.current.y = 0;
      targetRotation.current.x = 0;
    } else {
      targetRotation.current.y = state.pointer.x * Math.PI * 0.5;
      targetRotation.current.x = -state.pointer.y * Math.PI * 0.35;
    }
    
    // Suavização para voltar para a posição original com o topo para cima
    mouseRotation.current.y = THREE.MathUtils.lerp(mouseRotation.current.y, targetRotation.current.y, 0.06);
    mouseRotation.current.x = THREE.MathUtils.lerp(mouseRotation.current.x, targetRotation.current.x, 0.06);

    let tSpeed = 0.25; let tNoise = 0.14; let tPulse = 1.0; let tAudioInfluence = 0.0;

    if (currentState === 'waiting') {
      tSpeed = 0.18; tNoise = 0.11; tPulse = 1.0 + Math.sin(time * 0.8) * 0.006;
    } else if (currentState === 'listening') {
      tSpeed = 0.45; tNoise = 0.25; tAudioInfluence = audioVolume * 0.4;
    } else if (currentState === 'responding') {
      tSpeed = 0.22; tNoise = 0.14; tAudioInfluence = audioVolume * 1.6; 
    }

    const p = physics.current;
    p.speed = THREE.MathUtils.lerp(p.speed, tSpeed, 0.04);
    p.noiseIntensity = THREE.MathUtils.lerp(p.noiseIntensity, tNoise, 0.04);
    p.pulse = THREE.MathUtils.lerp(p.pulse, tPulse, 0.04);
    p.audioInfluence = THREE.MathUtils.lerp(p.audioInfluence, tAudioInfluence, 0.06);

    // 1. Atualizar Casca Externa
    for (let i = 0; i < outerCount; i++) {
      const d = outerData[i];
      const currentTheta = d.theta + (time * 0.025 * d.speedMultiplier * p.speed);

      const noiseX = Math.sin(currentTheta * 2.0 + time * 1.0 + d.phaseX);
      const noiseY = Math.cos(d.phi * 2.5 - time * 0.8 + d.phaseY);
      const baseNoise = (noiseX + noiseY) * d.personalAmp;

      const wavePattern = Math.sin(d.phi * 7.0 - time * 3.0) * Math.cos(currentTheta * 2.5);
      const audioWave = wavePattern * p.audioInfluence * 0.15;

      const totalNoise = baseNoise * (1.0 + p.audioInfluence * 1.3) + audioWave;
      const currentRadius = (baseRadius + totalNoise) * p.pulse;

      outPos[i * 3] = currentRadius * Math.sin(d.phi) * Math.cos(currentTheta);
      outPos[i * 3 + 1] = currentRadius * Math.sin(d.phi) * Math.sin(currentTheta);
      outPos[i * 3 + 2] = currentRadius * Math.cos(d.phi);

      // PARTE EDITADA PARA INTENSIFICAR A COR E MANTER O PRATA embaixo:
      const heightFactor = (outPos[i * 3 + 1] / currentRadius + 1.0) * 0.5; 
      const colorMix = Math.pow(heightFactor, 1); // CORES
      
      let finalColor = new THREE.Color().lerpColors(cBottom, cTop, colorMix);
      
      const distToTop = Math.acos(outPos[i * 3 + 1] / currentRadius) / Math.PI; 
      const lightFactor = Math.max(0, 1.0 - distToTop * 1.4); 

      if (lightFactor > 0.35) {
        finalColor.lerp(cCore, (lightFactor - 0.35) * 0.4);
      }

      const depthRatio = (outPos[i * 3 + 2] + baseRadius) / (baseRadius * 2);
      finalColor.addScalar(depthRatio * 0.04);

      if (p.audioInfluence > 0.1) {
        finalColor.addScalar(Math.abs(audioWave) * 0.9);
      }

      outCol[i * 3] = finalColor.r; 
      outCol[i * 3 + 1] = finalColor.g; 
      outCol[i * 3 + 2] = finalColor.b;
    }

    // 2. Atualizar Núcleo Interno Sincronizado
    for (let i = 0; i < innerCount; i++) {
      const coreColor = cCore.clone().multiplyScalar(0.25 + Math.sin(time * 2.0 + i) * 0.05);
      if (p.audioInfluence > 0.1) {
        coreColor.add(cTop.clone().multiplyScalar(p.audioInfluence * 0.18));
      }
      innCol[i * 3] = coreColor.r;
      innCol[i * 3 + 1] = coreColor.g;
      innCol[i * 3 + 2] = coreColor.b;
    }

    outerPointsRef.current.geometry.attributes.position.needsUpdate = true;
    outerPointsRef.current.geometry.attributes.color.needsUpdate = true;
    innerPointsRef.current.geometry.attributes.color.needsUpdate = true;

    // Aplicando as rotações do mouse com amortecimento para voltar ao ponto inicial
    outerPointsRef.current.rotation.y = time * 0.015 + mouseRotation.current.y;
    outerPointsRef.current.rotation.x = mouseRotation.current.x;
    
    innerPointsRef.current.rotation.y = -time * 0.03 + mouseRotation.current.y * 0.5;
    innerPointsRef.current.rotation.x = mouseRotation.current.x * 0.5;
  });

  return (
    <group>
      <points ref={outerPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[outerPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[outerColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={innerPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[innerPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[innerColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function SoundSimulator({ isTesting, setVolume }) {
  const testTime = useRef(0);
  useFrame(() => {
    if (isTesting) {
      testTime.current += 0.06;
      const speechFlow = Math.sin(testTime.current * 1.6) * Math.cos(testTime.current * 0.5) * (0.6 + Math.sin(testTime.current * 2.8) * 0.4);
      setVolume(Math.max(0, speechFlow));
    } else {
      setVolume(0);
    }
  });
  return null;
}

export function ParticleGlobe() {
  const [isClickTesting, setIsClickTesting] = useState(false);
  const [simulatedVolume, setSimulatedVolume] = useState(0);
  const [currentState, setCurrentState] = useState('waiting'); 
  const [currentEmotion, setCurrentEmotion] = useState('normal'); 

  const activeState = isClickTesting ? 'responding' : currentState;

  return (
    <div className="relative w-full bg-black rounded-2xl overflow-hidden border border-slate-950 shadow-2xl flex flex-col items-center">
      
      <div 
        className="relative w-full h-115 cursor-grab active:cursor-grabbing select-none"
        onClick={() => setIsClickTesting(!isClickTesting)}
      >
        <div className="absolute top-4 left-4 z-10 text-[10px] text-slate-500 font-mono bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded border border-slate-900 pointer-events-none tracking-widest flex items-center gap-2">
          SISTEMA: <span className={`font-bold uppercase ${currentEmotion === 'alert' ? 'text-orange-500' : 'text-lime-400'}`}>{activeState}</span>
          <span>|</span>
          MODO: <span className={`font-bold uppercase ${currentEmotion === 'alert' ? 'text-orange-500' : 'text-lime-400'}`}>{currentEmotion}</span>
      </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[10px] font-mono tracking-wider px-4 py-1.5 rounded-md bg-slate-950/90 border border-slate-900 text-slate-400 pointer-events-none">
          {isClickTesting ? "⚙️ SIMULANDO REPRODUÇÃO DE ÁUDIO" : "🖥️ CLIQUE NO GLOBO PARA FALAR"}
        </div>

        <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }}>
          <ambientLight intensity={0.5} />
          <SoundSimulator isTesting={isClickTesting} setVolume={setSimulatedVolume} />
          <ParticleGlobeMesh 
            currentState={activeState} 
            audioVolume={simulatedVolume} 
            currentEmotion={currentEmotion} 
          />
        </Canvas>
      </div>

      <div className="w-full bg-slate-950/60 backdrop-blur p-4 border-t border-slate-900 flex justify-center gap-4 z-20">
      <button 
          onClick={() => { setCurrentEmotion('normal'); setCurrentState('waiting'); }}
          className={`px-4 py-1.5 rounded text-xs font-mono tracking-wider transition-all duration-200 border ${
            currentEmotion === 'normal' 
              ? 'bg-lime-500/10 text-lime-400 border-lime-500/40 shadow-[0_0_12px_rgba(163,230,53,0.15)]' 
              : 'bg-slate-900 text-slate-400 border-transparent hover:bg-slate-800'
          }`}
        >
          🟢 PRODUTO PADRÃO (VERDE)
      </button>

        <button
          onClick={() => { setCurrentEmotion('alert'); setCurrentState('responding'); }}
          className={`px-4 py-1.5 rounded text-xs font-mono tracking-wider transition-all duration-200 border ${
            currentEmotion === 'alert' 
              ? 'bg-orange-500/10 text-orange-400 border-orange-500/40 shadow-[0_0_12px_rgba(255,81,0,0.15)]' 
              : 'bg-slate-900 text-slate-400 border-transparent hover:bg-slate-800'
          }`}
        >
          🚨 MODO ALERTA (LARANJA CINEMA)
        </button>
      </div>

    </div>
  );
}

export default ParticleGlobe;