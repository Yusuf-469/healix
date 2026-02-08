export const MODEL_PATHS = {
  doctor: '/models/medical-doctor-3d-model.glb',
  stethoscope: '/models/stethoscope-3d-model.glb',
  syringe: '/models/cartoon-syringe-3d-model.glb',
  pills: '/models/pill-bottle-3d-model.glb',
  dashboard: '/models/dashboard.glb'
};

export const getModelPath = (modelName) => {
  const path = MODEL_PATHS[modelName];
  if (!path) {
    console.warn(`Model ${modelName} not found`);
    return null;
  }
  return path;
};

export const AI_CONFIG = {
  baseURL: import.meta.env.VITE_AI_BASE_URL || '/api/v1',
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
