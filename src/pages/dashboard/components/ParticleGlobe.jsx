import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleGlobeMesh({ currentState, audioVolume = 0, currentEmotion = 'normal' }) {
  const outerPointsRef = useRef();
  const innerPointsRef = useRef();
  
  const outerCount = 12000; 
  const innerCount = 1000; 
  const baseRadius = 2.3; 

  const physics = useRef({
    speed: 0.25,
    noiseIntensity: 0.14,
    pulse: 1.0,
    audioInfluence: 0.0
  });

  const mouseRotation = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

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

    if (state.pointer.x === 0 && state.pointer.y === 0) {
      targetRotation.current.y = 0;
      targetRotation.current.x = 0;
    } else {
      targetRotation.current.y = state.pointer.x * Math.PI * 0.5;
      targetRotation.current.x = -state.pointer.y * Math.PI * 0.35;
    }
    
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

      const heightFactor = (outPos[i * 3 + 1] / currentRadius + 1.0) * 0.5; 
      const colorMix = Math.pow(heightFactor, 1); 
      
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

// Removido o SoundSimulator estático já que a interface de simulação sumiu.
// Caso precise injetar volume de áudio real, basta passar pelas propriedades do ParticleGlobe.

export function ParticleGlobe({ currentState = 'waiting', currentEmotion = 'normal', audioVolume = 0 }) {
  return (
    <div className="w-full h-115 cursor-grab active:cursor-grabbing select-none bg-transparent">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <ParticleGlobeMesh 
          currentState={currentState} 
          audioVolume={audioVolume} 
          currentEmotion={currentEmotion} 
        />
      </Canvas>
    </div>
  );
}

export default ParticleGlobe;