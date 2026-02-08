import React from 'react';
import { useAuthStore } from '../../../stores/authStore';
import { useGamificationStore } from '../../../stores/gamificationStore';
import { useUIStore } from '../../../stores/uiStore';

const tools = [
  { id: 0, name: 'AI Doctor', icon: '👨‍⚕️', key: 'doctor' },
  { id: 1, name: 'Analyzer', icon: '📊', key: 'analyzer' },
  { id: 2, name: 'Tracker', icon: '💉', key: 'tracker' },
  { id: 3, name: 'Meds', icon: '💊', key: 'medication' }
];

export const Sidebar = ({ activeTool, healthScore }) => {
  const { openChat, openAnalyzer, openTracker, openMedication } = useUIStore();
  const { level, streak, getLevelTitle } = useGamificationStore();
  const { isDemo } = useAuthStore();

  const toolActions = [openChat, openAnalyzer, openTracker, openMedication];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-navy-800/90 backdrop-blur-lg border-r border-navy-700 z-40 flex flex-col p-4">
      <div className="bg-navy-700/50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-healix-accent rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <p className="text-white font-semibold">Demo User</p>
            <p className="text-xs text-gray-400">{getLevelTitle()}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Health Score</span>
          <span className="text-healix-success font-semibold">{healthScore}</span>
        </div>
        <div className="w-full h-2 bg-navy-600 rounded-full mt-2">
          <div className="h-full bg-healix-success rounded-full" style={{ width: `${healthScore}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-navy-700/30 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-healix-accent">{streak}</p>
          <p className="text-xs text-gray-400">Day Streak</p>
        </div>
        <div className="bg-navy-700/30 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-purple-400">{level}</p>
          <p className="text-xs text-gray-400">Level</p>
        </div>
      </div>

      <div className="space-y-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={toolActions[tool.id]}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTool === tool.id 
                ? 'bg-healix-accent/20 border border-healix-accent/50 text-white' 
                : 'bg-navy-700/30 hover:bg-navy-700/50 text-gray-300 hover:text-white'
            }`}
          >
            <span className="text-xl">{tool.icon}</span>
            <span className="font-medium">{tool.name}</span>
          </button>
        ))}
      </div>

      {isDemo && (
        <div className="mt-auto pt-4 border-t border-navy-700">
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-3 text-center">
            <p className="text-xs text-purple-300">Demo Mode Active</p>
            <p className="text-xs text-gray-400 mt-1">5 reports/day, 10 chats/day</p>
          </div>
        </div>
      )}
    </aside>
  );
};
