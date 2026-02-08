import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  activeModal: null,
  emergencyActive: false,
  emergencyLevel: null,
  emergencyData: null,

  openChat: () => set({ activeModal: 'chat' }),
  openAnalyzer: () => set({ activeModal: 'analyzer' }),
  openTracker: () => set({ activeModal: 'tracker' }),
  openMedication: () => set({ activeModal: 'medication' }),
  openEmergency: () => set({ emergencyActive: true }),
  closeAllModals: () => set({ activeModal: null, emergencyActive: false, emergencyLevel: null, emergencyData: null }),

  triggerEmergency: (level, data) => {
    set({ emergencyActive: true, emergencyLevel: level, emergencyData: data });
  },

  clearEmergency: () => {
    set({ emergencyActive: false, emergencyLevel: null, emergencyData: null });
  },

  closeChat: () => {
    if (get().activeModal === 'chat') set({ activeModal: null });
  },
  closeAnalyzer: () => {
    if (get().activeModal === 'analyzer') set({ activeModal: null });
  },
  closeTracker: () => {
    if (get().activeModal === 'tracker') set({ activeModal: null });
  },
  closeMedication: () => {
    if (get().activeModal === 'medication') set({ activeModal: null });
  }
}));
