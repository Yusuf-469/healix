import React from 'react';

export const DemoBadge = () => (
  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">DEMO</span>
);

export const DemoLoginButton = () => {
  const [loading, setLoading] = React.useState(false);
  const { demoLogin } = require('../../stores/authStore').useAuthStore();
  const { addXP } = require('../../stores/gamificationStore').useGamificationStore();
  const navigate = require('react-router-dom').useNavigate();
  const { DEMO_CREDENTIALS } = require('../../utils/constants');

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await demoLogin(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
      addXP(25);
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleDemoLogin}
      disabled={loading}
      className="px-4 py-2 bg-gradient-to-r from-healix-accent to-yellow-500 text-healix-primary font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {loading ? 'Logging in...' : 'Demo User'}
    </button>
  );
};
