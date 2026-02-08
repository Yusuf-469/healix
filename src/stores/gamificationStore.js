import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LEVELS, XP_REWARDS } from '../utils/constants';

export const useGamificationStore = create(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      streak: 0,
      lastCheckin: null,
      achievements: [],
      chatCount: 0,
      reportsAnalyzed: 0,

      addXP: (amount) => {
        const { xp, level } = get();
        const newXP = xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1;
        set({ xp: newXP, level: newLevel });
      },

      incrementChatCount: () => {
        const { chatCount } = get();
        set({ chatCount: chatCount + 1 });
        get().addXP(XP_REWARDS.complete_chat);
      },

      incrementReportsCount: () => {
        const { reportsAnalyzed } = get();
        set({ reportsAnalyzed: reportsAnalyzed + 1 });
        get().addXP(XP_REWARDS.upload_report);
      },

      checkin: () => {
        const { lastCheckin, streak } = get();
        const today = new Date().toDateString();
        if (lastCheckin === today) return;
        const newStreak = lastCheckin === new Date(Date.now() - 86400000).toDateString() ? streak + 1 : 1;
        set({ lastCheckin: today, streak: newStreak });
        get().addXP(XP_REWARDS.daily_checkin);
      },

      getLevelTitle: () => {
        const { level } = get();
        const titles = Object.entries(LEVELS);
        const currentTitle = titles.reverse().find(([lvl]) => level >= parseInt(lvl));
        return currentTitle ? currentTitle[1] : 'Health Novice';
      },

      checkAchievements: () => {
        const state = get();
        const newAchievements = [];
        if (state.chatCount >= 1 && !state.achievements.includes('first_chat')) {
          newAchievements.push('first_chat');
        }
        if (state.reportsAnalyzed >= 5 && !state.achievements.includes('report_master')) {
          newAchievements.push('report_master');
        }
        if (state.streak >= 7 && !state.achievements.includes('streak_7')) {
          newAchievements.push('streak_7');
        }
        if (newAchievements.length > 0) {
          set((state) => ({ achievements: [...state.achievements, ...newAchievements] }));
          newAchievements.forEach((a) => get().addXP(100));
        }
        return newAchievements;
      }
    }),
    { name: 'healix-gamification' }
  )
);
