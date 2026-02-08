import React from 'react';
import { MEDICATION_FEATURES } from '../../utils/constants';
import { MODEL_PATHS } from '../../utils/modelPaths';
import { ModelViewer } from '../common/ModelViewer';
import { useUIStore } from '../../stores/uiStore';

export const MedicationShowcase = () => {
  const { openAuthModal } = useUIStore();
  return (
    <section id="section-medication" className="h-screen w-full bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-1/2 pl-12 pr-8">
          <div className="bg-navy-900/80 backdrop-blur-lg rounded-2xl p-8 border border-navy-700 ml-12">
            <h2 className="text-4xl font-bold text-white mb-4">The <span className="text-healix-accent">Medication Manager</span> — Safe & Simple</h2>
            <p className="text-gray-300 text-lg mb-6">Manage prescriptions with confidence.</p>
            <ul className="space-y-3 mb-8">{MEDICATION_FEATURES.map((f, i) => <li key={i} className="flex items-center gap-3 text-gray-200"><span className="w-2 h-2 bg-orange-500 rounded-full"></span>{f}</li>)}</ul>
            <button onClick={openAuthModal} className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl">🔒 Login to Manage</button>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <ModelViewer path={MODEL_PATHS.pills} position={[0, 0, 0]} scale={2} onClick={() => {}} hoverScale={1.1} />
        </div>
      </div>
    </section>
  );
};
