import React, { useState } from 'react';
import { useUIStore } from '../../../stores/uiStore';

export const TrackerModal = () => {
  const [activeTab, setActiveTab] = useState('vaccinations');
  const { closeTracker } = useUIStore();

  const vaccinations = [
    { name: 'COVID-19 Booster', date: '2024-01-15', status: 'completed' },
    { name: 'Influenza', date: '2024-10-01', status: 'upcoming' },
    { name: 'Tetanus', date: '2025-03-20', status: 'scheduled' }
  ];

  const treatments = [
    { name: 'Physical Therapy', progress: 65, sessions: '13/20' },
    { name: 'Antibiotics Course', progress: 80, sessions: '8/10' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-navy-800 rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden border border-navy-700">
        <div className="p-6 border-b border-navy-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💉</span>
            <div>
              <h2 className="text-xl font-bold text-white">Treatment Tracker</h2>
              <p className="text-sm text-gray-400">Manage your health timeline</p>
            </div>
          </div>
          <button onClick={closeTracker} className="p-2 hover:bg-navy-700 rounded-lg transition-colors">
            <span className="text-xl">✕</span>
          </button>
        </div>

        <div className="flex border-b border-navy-700">
          {['vaccinations', 'treatments', 'calendar', 'pharmacy'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 font-medium capitalize transition-colors ${activeTab === tab ? 'text-healix-accent border-b-2 border-healix-accent' : 'text-gray-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'vaccinations' && (
            <div className="space-y-4">
              {vaccinations.map((vac, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-navy-700/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{vac.status === 'completed' ? '✅' : '📅'}</span>
                    <div><p className="text-white font-medium">{vac.name}</p><p className="text-sm text-gray-400">{vac.date}</p></div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${vac.status === 'completed' ? 'bg-green-500/20 text-green-400' : vac.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {vac.status}
                  </span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'treatments' && (
            <div className="space-y-4">
              {treatments.map((tx, i) => (
                <div key={i} className="p-4 bg-navy-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white font-medium">{tx.name}</p><p className="text-sm text-gray-400">{tx.sessions}</p>
                  </div>
                  <div className="w-full h-2 bg-navy-600 rounded-full">
                    <div className="h-full bg-healix-accent rounded-full transition-all" style={{ width: `${tx.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
          {(activeTab === 'calendar' || activeTab === 'pharmacy') && (
            <div className="text-center py-12 text-gray-400">
              <span className="text-5xl mb-4 block">{activeTab === 'calendar' ? '📅' : '🏥'}</span>
              <p>{activeTab === 'calendar' ? 'Calendar view coming soon' : 'Pharmacy integration coming soon'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
