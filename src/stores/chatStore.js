import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  messages: [],
  currentSessionId: null,
  isTyping: false,
  doctorEmotion: 'neutral',

  startSession: (sessionId) => {
    set({ currentSessionId: sessionId, messages: [] });
  },

  addMessage: (message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  setTyping: (typing) => {
    set({ isTyping: typing });
  },

  setEmotion: (emotion) => {
    set({ doctorEmotion: emotion });
  },

  clearMessages: () => {
    set({ messages: [] });
  },

  getHistory: () => {
    return get().messages.filter((m) => m.sender === 'user').map((m) => m.content);
  }
}));
