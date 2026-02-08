import React from 'react';
import { useUIStore } from '../../../stores/uiStore';

export const EmergencyButton = () => {
  const { openEmergency } = useUIStore();

  return (
    <button onClick={openEmergency} className="fixed bottom-8 right-8 w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full shadow-lg shadow-red-500/50 z-50 flex items-center justify-center transition-all hover:scale-110 animate-pulse" title="Emergency SOS">
      <span className="text-2xl">🚨</span>
    </button>
  );
};
