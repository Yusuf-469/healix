// Emergency Keywords
export const EMERGENCY_KEYWORDS = {
  critical: [
    'chest pain', 'heart attack', 'stroke', "can't breathe", 'unconscious',
    'bleeding heavily', 'suicide', 'overdose', 'anaphylaxis', 'not breathing',
    'severe bleeding', 'head injury', 'seizure', 'difficulty breathing'
  ],
  urgent: [
    'severe pain', 'high fever', 'dehydration', 'broken bone', 'poisoning',
    'heat stroke', 'severe headache', 'dizziness', 'confusion', 'vomiting blood'
  ]
};

// Emergency Levels
export const EMERGENCY_LEVELS = {
  critical: {
    level: 'critical',
    color: 'red',
    message: 'This appears to be a medical emergency. Please seek immediate help.',
    countdown: 30,
    autoCall: true,
    callButton: '108',
    findHospital: true
  },
  urgent: {
    level: 'urgent',
    color: 'orange',
    message: 'This requires prompt medical attention. Please consider visiting a hospital.',
    countdown: 60,
    autoCall: false,
    callButton: '108',
    findHospital: true
  },
  moderate: {
    level: 'moderate',
    color: 'yellow',
    message: 'You should consult a doctor soon, but it\'s not immediately life-threatening.',
    countdown: null,
    autoCall: false,
    callButton: null,
    findHospital: false
  },
  mild: {
    level: 'mild',
    color: 'green',
    message: 'This can likely be managed at home. Monitor your symptoms and seek help if they worsen.',
    countdown: null,
    autoCall: false,
    callButton: null,
    findHospital: false
  }
};

// Check if message contains emergency keywords
export const checkEmergencyKeywords = (text) => {
  const lowerText = text.toLowerCase();
  
  for (const keyword of EMERGENCY_KEYWORDS.critical) {
    if (lowerText.includes(keyword)) {
      return EMERGENCY_LEVELS.critical;
    }
  }
  
  for (const keyword of EMERGENCY_KEYWORDS.urgent) {
    if (lowerText.includes(keyword)) {
      return EMERGENCY_LEVELS.urgent;
    }
  }
  
  return null;
};

// Hospital search (uses browser geolocation)
export const findNearbyHospitals = async () => {
  if (!navigator.geolocation) {
    return { error: 'Geolocation not supported' };
  }
  
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // In production, use a hospital search API
        resolve({
          lat: latitude,
          lng: longitude,
          hospitals: [
            { name: 'Nearest Hospital', distance: '2.5 km', phone: '108' },
            { name: '24/7 Medical Center', distance: '4.1 km', phone: '1800-XXX-XXXX' }
          ]
        });
      },
      (error) => {
        resolve({ error: error.message });
      }
    );
  });
};
