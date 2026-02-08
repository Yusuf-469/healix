import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MODEL_PATHS } from '../../utils/modelPaths';
import { ModelViewer } from '../common/ModelViewer';

export const DashboardShowcase = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-1/2 h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <ModelViewer path={MODEL_PATHS.dashboard} scale={1.2} idleAnimation={true} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-white mb-6">The Dashboard — Everything in One Place</h2>
        <p className="text-gray-300 text-lg mb-6">Your complete health overview. Recent consultations, upcoming appointments, medication schedules — all visualized.</p>
        <ul className="space-y-3 text-gray-400">
          <li>✓ Unified health score</li>
          <li>✓ Activity timeline</li>
          <li>✓ Quick tool access</li>
          <li>✓ Export reports</li>
        </ul>
      </div>
    </div>
  );
};
