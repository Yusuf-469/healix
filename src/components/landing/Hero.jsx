import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text, Float, Stars, Sparkles, Line } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = () => {
  const particles = React.useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ],
      scale: Math.random() * 0.1 + 0.02,
      speed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <group>
      {particles.map((particle, i) => (
        <Float key={i} speed={particle.speed} rotationIntensity={2} floatIntensity={2}>
          <mesh position={particle.position} scale={particle.scale}>
            <sphereGeometry />
            <meshStandardMaterial 
              color={['#fbbf24', '#60a5fa', '#10b981', '#ef4444'][Math.floor(Math.random() * 4)]} 
              emissive="#fbbf24"
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const GlowingText = () => {
  const meshRef = useRef();
  
  React.useEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.x = 1 + Math.sin(0) * 0.02;
    }
  }, []);

  return (
    <group ref={meshRef}>
      <Text
        fontSize={2}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        HEALIX
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24"
          emissiveIntensity={0.8}
        />
      </Text>
    </group>
  );
};

const HeartbeatLine = () => {
  const points = React.useMemo(() => {
    const p = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i - 50) * 0.1;
      let y = 0;
      if (i > 45 && i < 50) y = 0.3;
      if (i >= 50 && i < 55) y = -0.1;
      p.push([x, y - 1.5, 0]);
    }
    return p;
  }, []);

  return (
    <Line
      points={points}
      color="#10b981"
      lineWidth={2}
    />
  );
};

export const Hero = () => {
  const { openAuthModal } = React.useMemo(() => ({ openAuthModal: () => {} }), []);

  return (
    <section id="section-hero" className="h-screen w-full bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      <div id="hero-container" className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} />
          <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#fbbf24" />
          <FloatingParticles />
          <GlowingText />
          <HeartbeatLine />
        </Canvas>
      </div>

      <div id="hero-content" className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div id="hero-brand" className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            <span className="text-healix-accent">HEALIX</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
            Your Health, Visualized
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto px-4">
            Meet the future of healthcare — four intelligent tools, one intelligent platform
          </p>
          <button
            className="px-8 py-4 bg-healix-accent hover:bg-yellow-500 text-healix-primary font-semibold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg shadow-healix-accent/30"
          >
            Start Free Consultation
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-healix-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
