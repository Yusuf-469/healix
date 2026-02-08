import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html, Float } from '@react-three/drei';

export const ModelViewer = ({ path, scale = 1, position = [0, 0, 0], onClick, idleAnimation = false }) => {
  const groupRef = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Create a simple placeholder geometry for when model fails to load
  const Placeholder = () => (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffd700" wireframe />
    </mesh>
  );

  // Try to load the GLTF model
  let Model = null;
  try {
    const { scene } = useGLTF(path);
    Model = scene;
  } catch (e) {
    setError(true);
  }

  useEffect(() => {
    if (Model) {
      setLoading(false);
    }
  }, [Model]);

  useFrame((state) => {
    if (idleAnimation && groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  if (error || !path) {
    return <Placeholder />;
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef} position={position} scale={scale} onClick={onClick}>
        <Suspense fallback={<Html><div className="text-white">Loading...</div></Html>}>
          <primitive object={Model} />
        </Suspense>
      </group>
    </Float>
  );
};

// Preload all models
useGLTF.preload('C:\\Users\\yusuf\\Downloads\\ai medical devops\\medical doctor 3d model.glb');
useGLTF.preload('C:\\Users\\yusuf\\Downloads\\ai medical devops\\stethoscope 3d model.glb');
useGLTF.preload('C:\\Users\\yusuf\\Downloads\\ai medical devops\\cartoon syringe 3d model.glb');
useGLTF.preload('C:\\Users\\yusuf\\Downloads\\ai medical devops\\pill bottle 3d model.glb');
useGLTF.preload('C:\\Users\\yusuf\\Downloads\\ai medical devops\\dashboard.glb');
