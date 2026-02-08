import React, { useState } from 'react';
import { CONTACT_INFO } from '../../utils/constants';
import { DemoLoginButton } from '../common/DemoLoginButton';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export const AboutContact = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });
  const { login, signup } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) navigate('/dashboard');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result.success) navigate('/dashboard');
  };

  return (
    <section id="section-contact" className="h-screen w-full bg-gradient-to-b from-navy-900 to-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 flex">
        <div id="about-content" className="w-1/2 p-16 flex flex-col justify-center">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-white mb-8">
              About <span className="text-healix-accent">Healix</span>
            </h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-healix-accent mb-3">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To democratize healthcare through intelligent technology, making medical insights accessible to everyone, everywhere.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-healix-accent mb-3">Our Values</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Accessibility', 'Clarity', 'Privacy', 'Innovation', 'Compassion'].map((value) => (
                  <div key={value} className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-healix-success rounded-full"></span>
                    {value}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-healix-accent mb-3">Founded</h3>
              <p className="text-gray-300">2024, India</p>
            </div>
          </div>
        </div>

        <div id="contact-content" className="w-1/2 p-16 flex flex-col justify-center bg-navy-800/50">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Get in <span className="text-healix-accent">Touch</span>
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-navy-700/50 rounded-lg">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">{CONTACT_INFO.phoneFormatted}</p>
                  <p className="text-xs text-gray-500">{CONTACT_INFO.hours}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-navy-700/50 rounded-lg">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{CONTACT_INFO.email}</p>
                  <p className="text-xs text-gray-500">{CONTACT_INFO.responseTime} response</p>
                </div>
              </div>
            </div>

            <div className="bg-navy-900/80 backdrop-blur-lg rounded-2xl p-6 border border-navy-700">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    authMode === 'login' ? 'bg-healix-accent text-healix-primary' : 'bg-navy-700 text-gray-300'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    authMode === 'signup' ? 'bg-healix-accent text-healix-primary' : 'bg-navy-700 text-gray-300'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {authMode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
                  <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
                  <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">Login</button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
                  <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-healix-accent" />
                  <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">Sign Up</button>
                </form>
              )}

              <div className="mt-4 pt-4 border-t border-navy-700">
                <DemoLoginButton onSuccess={() => navigate('/dashboard')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
