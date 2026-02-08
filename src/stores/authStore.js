import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isDemo: false,
  chatLimit: 10,
  reportLimit: 5,
  demoChatUsed: 0,
  demoReportsUsed: 0,

  login: async (email, password) => {
    // Simulated login - replace with actual API call
    const isDemoUser = email === 'demo@healix.ai' && password === 'Demo@1234';
    if (isDemoUser) {
      set({ user: { id: 'demo', name: 'Demo User', email: 'demo@healix.ai' }, isAuthenticated: true, isDemo: true, demoChatUsed: 0, demoReportsUsed: 0 });
      return;
    }
    set({ user: { id: '1', name: 'User', email }, isAuthenticated: true, isDemo: false });
  },

  signup: async (name, email, password) => {
    set({ user: { id: '1', name, email }, isAuthenticated: true, isDemo: false });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, isDemo: false, demoChatUsed: 0, demoReportsUsed: 0 });
  },

  canChat: () => {
    const { isDemo, demoChatUsed, chatLimit } = get();
    if (!isDemo) return true;
    return demoChatUsed < chatLimit;
  },

  canUploadReport: () => {
    const { isDemo, demoReportsUsed, reportLimit } = get();
    if (!isDemo) return true;
    return demoReportsUsed < reportLimit;
  },

  incrementChatUsage: () => {
    if (get().isDemo) {
      set((state) => ({ demoChatUsed: state.demoChatUsed + 1 }));
    }
  },

  incrementReportUsage: () => {
    if (get().isDemo) {
      set((state) => ({ demoReportsUsed: state.demoReportsUsed + 1 }));
    }
  },

  resetDailyLimits: () => {
    set({ demoChatUsed: 0, demoReportsUsed: 0 });
  }
}));
