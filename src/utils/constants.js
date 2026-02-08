export const XP_REWARDS = {
  complete_chat: 50,
  upload_report: 100,
  follow_treatment: 75,
  daily_checkin: 25,
  emergency_correct: 500
};

export const LEVELS = {
  1: 'Health Novice',
  5: 'Health Enthusiast',
  10: 'Health Warrior',
  20: 'Health Master',
  50: 'Health Legend'
};

export const ACHIEVEMENTS = [
  { id: 'first_chat', name: 'First Consultation', condition: (s) => s.chatCount >= 1, xp: 100 },
  { id: 'report_master', name: 'Report Analyst', condition: (s) => s.reportsAnalyzed >= 5, xp: 500 },
  { id: 'streak_7', name: 'Week Warrior', condition: (s) => s.streakDays >= 7, xp: 300 }
];

export const DEMO_CREDENTIALS = {
  email: 'demo@healix.ai',
  password: 'Demo@1234'
};

export const CONTACT_INFO = {
  phone: '+91 7903810922',
  email: 'support@healix.ai',
  hours: '9 AM - 9 PM IST, 7 days',
  responseTime: '24h'
};

export const DOCTOR_FEATURES = [
  'NLP-powered conversation',
  'Real-time diagnosis',
  'Emotional intelligence',
  'Multi-language support',
  'Voice & Text input'
];

export const ANALYZER_FEATURES = [
  '50+ formats supported',
  'Abnormality highlighting',
  'Trend analysis',
  'Plain English explanations',
  'PDF export'
];

export const TRACKER_FEATURES = [
  'Vaccination scheduling',
  'Medication reminders',
  'Progress tracking',
  'Family profiles',
  'Pharmacy integration'
];

export const MEDICATION_FEATURES = [
  'Drug interaction checker',
  'Dosage tracking',
  'Refill reminders',
  'Side effect monitor',
  'Cost comparison'
];

export const DASHBOARD_FEATURES = [
  'Unified health score',
  'Activity timeline',
  'Quick tool access',
  'Export reports',
  'Predictive insights'
];
