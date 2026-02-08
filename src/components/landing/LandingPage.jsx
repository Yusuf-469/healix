import React, { useRef, useEffect } from 'react';
import { Hero } from './Hero';
import { DoctorShowcase } from './DoctorShowcase';
import { AnalyzerShowcase } from './AnalyzerShowcase';
import { TrackerShowcase } from './TrackerShowcase';
import { MedicationShowcase } from './MedicationShowcase';
import { DashboardShowcase } from './DashboardShowcase';
import { FAQ } from './FAQ';
import { AboutContact } from './AboutContact';
import { useLandingScroll } from '../../hooks/useLandingScroll';
import { DemoLoginButton } from '../common/DemoLoginButton';

export const LandingPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    useLandingScroll(containerRef);
  }, []);

  return (
    <div ref={containerRef} className="bg-navy-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-lg border-b border-navy-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-healix-accent">HEALIX</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#section-doctor" className="text-gray-300 hover:text-white transition-colors">Doctor</a>
            <a href="#section-analyzer" className="text-gray-300 hover:text-white transition-colors">Analyzer</a>
            <a href="#section-tracker" className="text-gray-300 hover:text-white transition-colors">Tracker</a>
            <a href="#section-medication" className="text-gray-300 hover:text-white transition-colors">Meds</a>
            <a href="#section-faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
          </div>
          <DemoLoginButton />
        </div>
      </nav>

      <Hero />
      <DoctorShowcase />
      <AnalyzerShowcase />
      <TrackerShowcase />
      <MedicationShowcase />
      <DashboardShowcase />
      <FAQ />
      <AboutContact />

      <footer className="bg-navy-950 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 Healix AI. All rights reserved. | Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  );
};
