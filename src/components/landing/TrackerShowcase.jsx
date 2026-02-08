import React from 'react';
import { TRACKER_FEATURES } from '../../utils/constants';
import { MODEL_PATHS } from '../../utils/modelPaths';
import { ModelViewer } from '../common/ModelViewer';
import { useUIStore } from '../../stores/uiStore';

export const TrackerShowcase = () => {
  const { openAuthModal } = useUIStore();
  return (
    <section id="section-tracker" className="h-screen w-full bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-1/2 h-full flex items-center justify-center">
          <ModelViewer path={MODEL_PATHS.syringe} position={[0, -1, 0]} scale={2} onClick={() => {}} hoverScale={1.1} />
        </div>
        <div className="w-1/2 pr-12 pl-8">
          <div className="bg-navy-800/80 backdrop-blur-lg rounded-2xl p-8 border border-navy-700">
            <h2 className="text-4xl font-bold text-white mb-4">The <span className="text-healix-accent">Treatment Tracker</span> — Your Health Timeline</h2>
            <p className="text-gray-300 text-lg mb-6">From vaccines to medications, track every treatment.</p>
            <ul className="space-y-3 mb-8">{TRACKER_FEATURES.map((f, i) => <li key={i} className="flex items-center gap-3 text-gray-200"><span className="w-2 h-2 bg-purple-500 rounded-full"></span>{f}</li>)}</ul>
            <button onClick={openAuthModal} className="w-full py-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold rounded-xl">🔒 Login to Track</button>
          </div>
        </div>
      </div>
    </section>
  );
};
