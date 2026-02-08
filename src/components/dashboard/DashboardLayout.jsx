import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment, Stars } from '@react-three/drei';
import { TopBar } from './ui/TopBar';
import { Sidebar } from './ui/Sidebar';
import { OfflineBanner } from './ui/OfflineBanner';
import { EmergencyButton } from './ui/EmergencyButton';
import { DashboardScene } from './DashboardScene';
import { ChatModal } from './modals/ChatModal';
import { AnalyzerModal } from './modals/AnalyzerModal';
import { TrackerModal } from './modals/TrackerModal';
import { MedicationModal } from './modals/MedicationModal';
import { EmergencyModal } from './modals/EmergencyModal';
import { useUIStore } from '../../stores/uiStore';

export const DashboardLayout = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { 
    isChatOpen, isAnalyzerOpen, isTrackerOpen, 
    isMedicationOpen, isEmergencyOpen 
  } = useUIStore();

  return (
    <div className="dashboard-container h-screen w-screen overflow-hidden bg-navy-900">
      <TopBar user={{ name: 'Demo User', email: 'demo@healix.ai' }} notifications={[]} />
      <Sidebar tools={['doctor', 'analyzer', 'tracker', 'medication']} activeTool={currentPage} healthScore={85} />
      <OfflineBanner />
      <EmergencyButton />

      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <color attach="background" args={['#0a1628']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Environment preset="city" />
        <ScrollControls pages={4} damping={0.2}>
          <DashboardScene currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </ScrollControls>
      </Canvas>

      {isChatOpen && <ChatModal />}
      {isAnalyzerOpen && <AnalyzerModal />}
      {isTrackerOpen && <TrackerModal />}
      {isMedicationOpen && <MedicationModal />}
      {isEmergencyOpen && <EmergencyModal />}
    </div>
  );
};
