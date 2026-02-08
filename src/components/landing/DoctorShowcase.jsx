import React from 'react';
import { DOCTOR_FEATURES } from '../../utils/constants';
import { MODEL_PATHS } from '../../utils/modelPaths';
import { ModelViewer } from '../common/ModelViewer';
import { useUIStore } from '../../stores/uiStore';

export const DoctorShowcase = () => {
  const { openAuthModal } = useUIStore();

  return (
    <section id="section-doctor" className="h-screen w-full bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="w-1/2 h-full flex items-center justify-center">
          <ModelViewer path={MODEL_PATHS.doctor} position={[0, 0, 0]} scale={2} onClick={() => {}} hoverScale={1.1} />
        </div>

        <div className="w-1/2 pr-12 pl-8">
          <div className="bg-navy-800/80 backdrop-blur-lg rounded-2xl p-8 border border-navy-700">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="text-healix-accent">Dr. AI</span> — Your 24/7 Personal Physician
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Describe your symptoms in natural conversation. Our AI understands context, asks intelligent follow-ups, and provides accurate guidance.
            </p>
            
            <ul id="doctor-features" className="space-y-3 mb-8">
              {DOCTOR_FEATURES.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <span className="w-2 h-2 bg-healix-accent rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <button onClick={openAuthModal} className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105">
              🔒 Login to Consult
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
