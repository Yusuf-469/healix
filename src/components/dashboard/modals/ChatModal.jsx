import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../../stores/chatStore';
import { useYourAI } from '../../../hooks/useYourAI';
import { useVoiceInterface } from '../../../hooks/useVoiceInterface';
import { useUIStore } from '../../../stores/uiStore';
import { MODEL_PATHS } from '../../../utils/modelPaths';

const emotions = {
  neutral: { emoji: '😐' },
  analyzing: { emoji: '🤔' },
  concerned: { emoji: '😟' },
  reassuring: { emoji: '😊' },
  emergency: { emoji: '🚨' }
};

export const ChatModal = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const { messages, addMessage, isTyping, doctorEmotion } = useChatStore();
  const { diagnose } = useYourAI();
  const { isListening, startListening, stopListening, getTranscript } = useVoiceInterface();
  const { closeChat } = useUIStore();

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (isListening) setInput(getTranscript()); }, [isListening, getTranscript]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput('');
    await diagnose(userMessage);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-navy-800 rounded-2xl w-full max-w-4xl h-[80vh] flex overflow-hidden border border-navy-700 relative">
        <div className="w-80 bg-navy-900 flex flex-col items-center justify-center p-6 border-r border-navy-700">
          <div className="w-48 h-48 rounded-full bg-navy-800 flex items-center justify-center mb-6 overflow-hidden">
            <div className="text-9xl">{emotions[doctorEmotion]?.emoji || '😐'}</div>
          </div>
          <div className="text-center">
            <p className="text-3xl mb-2">{emotions[doctorEmotion]?.emoji || '😐'}</p>
            <p className="text-white font-semibold">Dr. AI</p>
            <p className="text-gray-400 text-sm capitalize">{doctorEmotion}</p>
          </div>
          <div className="mt-8 w-full space-y-3">
            <button onClick={isListening ? stopListening : startListening} className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${isListening ? 'bg-red-500/20 text-red-400' : 'bg-navy-700 text-white hover:bg-navy-600'}`}>
              <span>{isListening ? '🛑 Stop' : '🎤 Voice'}</span>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20">
                <p className="text-4xl mb-4">👨‍⚕️</p>
                <p className="text-lg">Describe your symptoms</p>
                <p className="text-sm mt-2">Try: "I have a headache"</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.sender === 'user' ? 'bg-healix-accent text-healix-primary' : 'bg-navy-700 text-white'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.confidence && <p className="text-xs mt-2 opacity-70">Confidence: {Math.round(msg.confidence * 100)}%</p>}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-navy-700 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-navy-700">
            <div className="flex gap-3">
              <button className="p-3 bg-navy-700 hover:bg-navy-600 rounded-lg"><span className="text-xl">📎</span></button>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Describe your symptoms..." className="flex-1 px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
              <button onClick={handleSend} disabled={!input.trim()} className="px-6 py-3 bg-healix-accent hover:bg-yellow-500 disabled:opacity-50 text-healix-primary font-semibold rounded-lg">Send</button>
            </div>
          </div>
        </div>

        <button onClick={closeChat} className="absolute top-4 right-4 p-2 hover:bg-navy-700 rounded-lg"><span className="text-xl">✕</span></button>
      </div>
    </div>
  );
};
