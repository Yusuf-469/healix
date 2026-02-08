import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../../stores/uiStore';

export const EmergencyModal = () => {
  const [countdown, setCountdown] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const { emergencyLevel, emergencyData, clearEmergency } = useUIStore();

  useEffect(() => {
    if (emergencyData?.countdown && !cancelled) {
      setCountdown(emergencyData.countdown);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            if (emergencyData.autoCall) window.location.href = `tel:${emergencyData.callButton}`;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [emergencyData, cancelled]);

  const level = emergencyData?.level || 'moderate';
  const colors = {
    critical: { bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-400' },
    urgent: { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-orange-400' },
    moderate: { bg: 'bg-yellow-500', border: 'border-yellow-500', text: 'text-yellow-400' },
    mild: { bg: 'bg-green-500', border: 'border-green-500', text: 'text-green-400' }
  };
  const color = colors[level] || colors.mild;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`relative bg-navy-800 rounded-2xl w-full max-w-md p-8 border-2 ${color.border}`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 ${color.bg}/20 rounded-full mb-6`}>
            <span className="text-6xl">{level === 'critical' ? '🚨' : level === 'urgent' ? '⚠️' : '🏥'}</span>
          </div>
          <h2 className={`text-3xl font-bold ${color.text} mb-4`}>{level.toUpperCase()} EMERGENCY</h2>
          <p className="text-white text-lg mb-6">{emergencyData?.message || 'Please seek medical attention immediately.'}</p>
          {countdown !== null && !cancelled && (
            <div className="mb-6 p-4 bg-navy-700 rounded-lg">
              <p className="text-gray-300 mb-2">Auto-calling in</p>
              <p className="text-4xl font-bold text-white">{countdown}s</p>
            </div>
          )}
          <div className="space-y-3">
            {emergencyData?.callButton && (
              <button onClick={() => window.location.href = `tel:${emergencyData.callButton}`} className={`w-full py-4 ${color.bg} hover:opacity-90 text-white font-semibold rounded-xl flex items-center justify-center gap-2`}>
                <span>📞</span> Call {emergencyData.callButton}
              </button>
            )}
            {emergencyData?.findHospital && (
              <button className="w-full py-4 bg-navy-700 hover:bg-navy-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2"><span>🏥</span> Find Hospital</button>
            )}
            <button onClick={() => { setCancelled(true); setCountdown(null); }} className="w-full py-4 bg-navy-700 hover:bg-navy-600 text-white font-semibold rounded-xl">{countdown !== null ? 'Cancel' : "I'm Safe - Close"}</button>
          </div>
          <button onClick={() => { setCountdown(null); setCancelled(false); clearEmergency(); }} className="absolute top-4 right-4 p-2 hover:bg-navy-700 rounded-lg"><span className="text-xl">✕</span></button>
        </div>
      </div>
    </div>
  );
};
