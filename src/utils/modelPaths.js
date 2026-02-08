export const MODEL_PATHS = {
  doctor: 'C:\\Users\\yusuf\\Downloads\\ai medical devops\\medical doctor 3d model.glb',
  stethoscope: 'C:\\Users\\yusuf\\Downloads\\ai medical devops\\stethoscope 3d model.glb',
  syringe: 'C:\\Users\\yusuf\\Downloads\\ai medical devops\\cartoon syringe 3d model.glb',
  pills: 'C:\\Users\\yusuf\\Downloads\\ai medical devops\\pill bottle 3d model.glb',
  dashboard: 'C:\\Users\\yusuf\\Downloads\\ai medical devops\\dashboard.glb'
};

export const AI_CONFIG = {
  baseURL: import.meta.env.VITE_AI_BASE_URL || 'http://localhost:8000/api/v1',
  apiKey: import.meta.env.VITE_AI_API_KEY,
  endpoints: {
    diagnose: '/diagnose',
    analyzeReport: '/analyze-report',
    chatHistory: '/chat/history',
    predict: '/predict',
    emergency: '/emergency-triage',
    voice: '/voice-to-symptoms'
  }
};

export const DEMO_CREDENTIALS = {
  email: 'demo@healix.ai',
  password: 'Demo@1234'
};
