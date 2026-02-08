import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import { useUIStore } from '../stores/uiStore';

const OFFLINE_QUEUE = 'offline-queue';

export const useOfflineMode = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState([]);
  const { setOffline } = useUIStore();

  useEffect(() => {
    const handleOnline = () => { setIsOnline(true); setOffline(false); syncPendingActions(); };
    const handleOffline = () => { setIsOnline(false); setOffline(true); };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    loadPendingActions();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOffline]);

  const loadPendingActions = async () => {
    try {
      const actions = await localforage.getItem(OFFLINE_QUEUE) || [];
      setPendingActions(actions);
    } catch (error) {
      console.error('Failed to load pending actions:', error);
    }
  };

  const syncPendingActions = async () => {
    const actions = await localforage.getItem(OFFLINE_QUEUE) || [];
    
    for (const action of actions) {
      try {
        await fetch(action.url, { method: action.method, headers: action.headers, body: JSON.stringify(action.body) });
      } catch (error) {
        console.error('Failed to sync action:', action, error);
      }
    }

    await localforage.removeItem(OFFLINE_QUEUE);
    setPendingActions([]);
  };

  const queueAction = useCallback(async (url, method, body, headers = {}) => {
    if (isOnline) {
      try {
        await fetch(url, { method, headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        return { success: true };
      } catch (error) {
        console.error('Action failed, queuing for later:', error);
      }
    }

    const action = { url, method, body, headers, timestamp: Date.now() };
    const newActions = [...pendingActions, action];
    await localforage.setItem(OFFLINE_QUEUE, newActions);
    setPendingActions(newActions);
    return { queued: true };
  }, [isOnline, pendingActions]);

  return { isOnline, pendingActions, pendingCount: pendingActions.length, queueAction, clearPendingActions: async () => { await localforage.removeItem(OFFLINE_QUEUE); setPendingActions([]); }, syncPendingActions };
};
