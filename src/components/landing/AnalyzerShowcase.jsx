import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MODEL_PATHS } from '../../utils/modelPaths';
import { ModelViewer } from '../common/ModelViewer';

export const AnalyzerShowcase = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-white mb-6">The Report Analyzer — Medical Clarity in Seconds</h2>
        <p className="text-gray-300 text-lg mb-6">Upload any medical report — blood tests, X-rays, MRIs, prescriptions. Our AI reads, interprets, and explains in plain language.</p>
        <ul className="space-y-3 text-gray-400">
          <li>✓ 50+ formats supported</li>
          <li>✓ Abnormality highlighting</li>
          <li>✓ Trend analysis</li>
          <li>✓ PDF export</li>
        </ul>
      </div>
      <div className="w-1/2 h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <ModelViewer path={MODEL_PATHS.stethoscope} scale={1.2} idleAnimation={true} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};
