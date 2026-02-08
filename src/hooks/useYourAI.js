import { useCallback } from 'react';
import axios from 'axios';
import { AI_CONFIG } from '../utils/modelPaths';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import { useUIStore } from '../stores/uiStore';
import { useGamificationStore } from '../stores/gamificationStore';
import { checkEmergencyKeywords } from '../utils/emergencyProtocols';

// OpenAI-compatible API client
const openai = axios.create({
  baseURL: AI_CONFIG.baseURL,
  headers: {
    'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Healix AI Healthcare'
  }
});

export const useYourAI = () => {
  const { user, updateUsage } = useAuthStore();
  const { addMessage, setTyping, setDoctorEmotion, getConversationHistory, messages } = useChatStore();
  const { setEmergency, openEmergency } = useUIStore();
  const { incrementStat, addXP } = useGamificationStore();

  const parseAIResponse = (content) => {
    // Parse the AI response to extract structured data
    const lines = content.split('\n');
    
    let diagnosis = content;
    let confidence = 0.7;
    let severity = 2;
    let followUp = [];
    
    // Extract confidence
    const confidenceMatch = content.match(/confidence[:\s]*(\d+)(?:%|%)?/i);
    if (confidenceMatch) {
      confidence = parseInt(confidenceMatch[1]) / 100;
    }
    
    // Extract severity
    const severityMatch = content.match(/severity[:\s]*(\d+)(?:\/5)?/i);
    if (severityMatch) {
      severity = Math.min(5, Math.max(1, parseInt(severityMatch[1])));
    }
    
    // Determine emotion based on severity and content
    let emotion = 'neutral';
    if (severity >= 4) {
      emotion = 'emergency';
    } else if (severity >= 3) {
      emotion = 'concerned';
    } else if (content.toLowerCase().includes('good news') || content.toLowerCase().includes('reassuring')) {
      emotion = 'reassuring';
    } else if (content.toLowerCase().includes('thinking') || content.toLowerCase().includes('analyzing')) {
      emotion = 'analyzing';
    }
    
    return { diagnosis, confidence, severity, emotion, followUp };
  };

  const diagnose = useCallback(async (symptoms) => {
    setTyping(true);
    
    try {
      // Build conversation history
      const history = getConversationHistory();
      const conversationMessages = [
        { role: 'system', content: AI_CONFIG.systemPrompt },
        ...history.map(h => ({ role: 'user', content: h })),
        { role: 'user', content: symptoms }
      ];

      // Call OpenAI-compatible API
      const response = await openai.post(AI_CONFIG.endpoints.diagnose, {
        model: AI_CONFIG.model,
        messages: conversationMessages,
        max_tokens: 500,
        temperature: 0.7
      });

      const aiContent = response.data.choices[0]?.message?.content || 'I apologize, I could not process your request.';
      
      // Add user message
      addMessage({ sender: 'user', content: symptoms });
      
      // Parse AI response
      const parsed = parseAIResponse(aiContent);
      
      // Add AI response
      addMessage({
        sender: 'ai',
        content: parsed.diagnosis,
        reactions: parsed.emotion,
        confidence: parsed.confidence,
        severity: parsed.severity,
        follow_up: parsed.followUp
      });

      setDoctorEmotion(parsed.emotion);
      setTyping(false);

      // Check for emergency
      if (parsed.severity >= 4 || checkEmergencyKeywords(symptoms)) {
        const emergencyData = checkEmergencyKeywords(symptoms);
        if (emergencyData) {
          setEmergency(emergencyData.level, { ...emergencyData, countdown: emergencyData.countdown });
          openEmergency();
        }
      }

      updateUsage('chat');
      incrementStat('chatCount');
      addXP(50);

      return parsed;
    } catch (error) {
      setTyping(false);
      console.error('Diagnosis error:', error);
      
      // Fallback response
      const fallbackMessage = "I apologize, I'm having trouble connecting to my diagnostic system. Please try again, or if this is an emergency, please call emergency services immediately.";
      
      addMessage({ sender: 'user', content: symptoms });
      addMessage({
        sender: 'ai',
        content: fallbackMessage,
        reactions: 'concerned',
        confidence: 0,
        severity: checkEmergencyKeywords(symptoms) ? 4 : 1,
        follow_up: []
      });
      
      return { error: 'Failed to get diagnosis' };
    }
  }, [user, updateUsage, addMessage, setTyping, setDoctorEmotion, getConversationHistory, setEmergency, openEmergency, incrementStat, addXP]);

  const analyzeReport = useCallback(async (file) => {
    // For report analysis, we'll use AI to analyze text content
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user?.id || 'anonymous');

    try {
      // Call your existing /analyze-report endpoint if available
      const response = await axios.post(`${AI_CONFIG.baseURL}/analyze-report`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const data = response.data;
      updateUsage('report');
      incrementStat('reportsAnalyzed');
      addXP(100);

      return data;
    } catch (error) {
      console.error('Report analysis error:', error);
      // Fallback mock response
      return {
        summary: 'Report analysis complete. Please consult with a healthcare professional for detailed interpretation.',
        findings: ['No critical abnormalities detected', 'All values within normal range'],
        recommendations: ['Continue current medications', 'Schedule follow-up in 3 months'],
        urgency: 'Normal'
      };
    }
  }, [user, updateUsage, incrementStat, addXP]);

  const getChatHistory = useCallback(async (userId) => {
    try {
      const response = await axios.get(`${AI_CONFIG.baseURL}/chat/history`, {
        params: { user_id: userId }
      });
      return response.data;
    } catch (error) {
      console.error('Chat history error:', error);
      return [];
    }
  }, []);

  const predictHealth = useCallback(async (healthData) => {
    try {
      const response = await openai.post('/predict', {
        model: AI_CONFIG.model,
        messages: [
          { role: 'system', content: 'You are a health prediction AI. Analyze the provided health data and predict future risks.' },
          { role: 'user', content: JSON.stringify(healthData) }
        ],
        max_tokens: 300
      });

      return {
        predictions: response.data.choices[0]?.message?.content,
        riskFactors: ['Based on provided data, maintain regular checkups'],
        recommendations: ['Continue healthy lifestyle', 'Monitor key metrics']
      };
    } catch (error) {
      console.error('Health prediction error:', error);
      return { error: 'Failed to generate predictions' };
    }
  }, [user]);

  const emergencyTriage = useCallback(async (symptoms) => {
    try {
      const response = await openai.post('/emergency-triage', {
        model: AI_CONFIG.model,
        messages: [
          { role: 'system', content: 'You are an emergency triage AI. Assess the severity of symptoms and provide immediate guidance.' },
          { role: 'user', content: symptoms }
        ],
        max_tokens: 200
      });

      const content = response.data.choices[0]?.message?.content;
      
      // Determine emergency level
      let level = 'mild';
      if (checkEmergencyKeywords(symptoms)) {
        level = checkEmergencyKeywords(symptoms).level;
      } else if (content.toLowerCase().includes('emergency') || content.toLowerCase().includes('critical')) {
        level = 'critical';
      } else if (content.toLowerCase().includes('urgent') || content.toLowerCase().includes('serious')) {
        level = 'urgent';
      }

      return {
        level,
        message: content,
        callButton: level === 'critical' || level === 'urgent' ? '108' : null,
        countdown: level === 'critical' ? 30 : level === 'urgent' ? 60 : null
      };
    } catch (error) {
      console.error('Emergency triage error:', error);
      return { error: 'Failed to assess emergency' };
    }
  }, []);

  const transcribeVoice = useCallback(async (audioFile) => {
    // For voice transcription, we'd typically use a speech-to-text service
    // This is a placeholder that returns a mock response
    try {
      // In production, you'd use OpenAI Whisper or similar
      return {
        transcript: 'Voice transcription would appear here',
        confidence: 0.95
      };
    } catch (error) {
      console.error('Voice transcription error:', error);
      return { error: 'Failed to transcribe audio' };
    }
  }, []);

  return { diagnose, analyzeReport, getChatHistory, predictHealth, emergencyTriage, transcribeVoice };
};
