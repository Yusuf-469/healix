import React from 'react';
import { useAuthStore } from '../../../stores/authStore';
import { DemoBadge } from '../../common/DemoLoginButton';

export const TopBar = ({ user, notifications }) => {
  const { logout, isDemo } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-navy-900/90 backdrop-blur-lg border-b border-navy-700 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-healix-accent">HEALIX</span>
        {isDemo && <DemoBadge />}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input type="text" placeholder="Search..." className="w-80 px-4 py-2 bg-navy-800 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-navy-700 rounded-lg"><span className="text-xl">🔔</span>{notifications?.length > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">{notifications.length}</span>}</button>

        <div className="flex items-center gap-3 pl-4 border-l border-navy-700">
          <div className="text-right">
            <p className="text-white font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <div className="w-10 h-10 bg-healix-accent rounded-full flex items-center justify-center"><span className="text-xl">👤</span></div>
          <button onClick={logout} className="p-2 hover:bg-navy-700 rounded-lg" title="Logout"><span className="text-xl">🚪</span></button>
        </div>
      </div>
    </header>
  );
};
