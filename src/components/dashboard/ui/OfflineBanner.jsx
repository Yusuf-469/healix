import React from 'react';
import { useOfflineMode } from '../../../hooks/useOfflineMode';

export const OfflineBanner = () => {
  const { isOnline, pendingCount } = useOfflineMode();
  if (isOnline) return null;

  return (
    <div className="fixed top-16 left-64 right-0 bg-yellow-500/90 backdrop-blur-lg z-40 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚡</span>
        <div>
          <p className="text-yellow-900 font-medium">You're offline</p>
          <p className="text-yellow-800 text-sm">{pendingCount > 0 ? `${pendingCount} actions pending` : 'Changes saved locally'}</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-yellow-600 text-yellow-900 rounded-lg font-medium">Emergency Guide</button>
    </div>
  );
};
