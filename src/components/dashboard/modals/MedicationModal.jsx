import React, { useState } from 'react';
import { useUIStore } from '../../../stores/uiStore';

export const MedicationModal = () => {
  const [activeTab, setActiveTab] = useState('current');
  const { closeMedication } = useUIStore();

  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', taken: true },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', taken: false },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', taken: true }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-navy-800 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden border border-navy-700">
        <div className="p-6 border-b border-navy-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💊</span>
            <div><h2 className="text-xl font-bold text-white">Medication Manager</h2><p className="text-sm text-gray-400">Track and manage your prescriptions</p></div>
          </div>
          <button onClick={closeMedication} className="p-2 hover:bg-navy-700 rounded-lg transition-colors"><span className="text-xl">✕</span></button>
        </div>

        <div className="flex border-b border-navy-700">
          {['current', 'interactions', 'add', 'history'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 font-medium capitalize transition-colors ${activeTab === tab ? 'text-healix-accent border-b-2 border-healix-accent' : 'text-gray-400 hover:text-white'}`}>{tab}</button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'current' && (
            <div className="space-y-3">
              {medications.map((med, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-navy-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${med.taken ? 'bg-green-500 border-green-500' : 'border-gray-500 hover:border-green-400'}`}>
                      {med.taken && <span className="text-white text-sm">✓</span>}
                    </button>
                    <div><p className="text-white font-medium">{med.name}</p><p className="text-sm text-gray-400">{med.dosage} • {med.frequency}</p></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'interactions' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-navy-700/50 rounded-lg">
                <input type="text" placeholder="Add medication to check..." className="flex-1 bg-navy-600 border border-navy-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
                <button className="px-4 py-2 bg-healix-accent text-healix-primary font-medium rounded-lg">Check</button>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 font-medium">Metformin + Alcohol</p>
                <p className="text-sm text-gray-400 mt-1">Moderate Risk - Avoid alcohol while taking this medication</p>
              </div>
            </div>
          )}
          {(activeTab === 'add' || activeTab === 'history') && (
            <div className="text-center py-12 text-gray-400">
              <span className="text-5xl mb-4 block">{activeTab === 'add' ? '➕' : '📋'}</span>
              <p>{activeTab === 'add' ? 'Add medication form coming soon' : 'Medication history coming soon'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
