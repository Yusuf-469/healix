import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text, Float, Sparkles, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATHS } from '../../utils/modelPaths';
import { ModelViewer } from '../common/ModelViewer';
import { useUIStore } from '../../stores/uiStore';

const SummaryView = () => {
  const [healthScore, setHealthScore] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setHealthScore(prev => Math.min(95, prev + 2)), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={[0, 0, 0]}>
      <Text position={[0, 2.5, 0]} fontSize={0.5} color="#fbbf24" anchorX="center">Your Health Overview</Text>
      <group position={[0, 0, 0]}>
        <Ring args={[1.5, 1.8, 64]}><meshBasicMaterial color="#1e3a5f" side={THREE.DoubleSide} /></Ring>
        <group rotation={[0, 0, -Math.PI * 0.75]}>
          <Ring args={[1.5, 1.8, 64, 1, 0, Math.PI * (healthScore / 100) * 1.5]}><meshBasicMaterial color="#10b981" /></Ring>
        </group>
        <Text position={[0, 0, 0.1]} fontSize={1} color="#10b981">{healthScore}</Text>
        <Text position={[0, -0.4, 0.1]} fontSize={0.2} color="#fbbf24">Health Score</Text>
      </group>
    </group>
  );
};

const DoctorScene = ({ onClick }) => (
  <group position={[0, -8, 0]}>
    <ModelViewer path={MODEL_PATHS.doctor} position={[0, 0, 0]} scale={2.5} onClick={onClick} hoverScale={1.1} />
    <Text position={[0, 2.5, 0]} fontSize={0.4} color="#fbbf24" anchorX="center">Dr. AI - Click to Consult</Text>
    <Sparkles count={50} scale={5} size={2} speed={0.4} color="#3b82f6" />
  </group>
);

const StethoscopeScene = ({ onClick }) => (
  <group position={[0, -16, 0]}>
    <ModelViewer path={MODEL_PATHS.stethoscope} position={[0, 0, 0]} scale={3} onClick={onClick} hoverScale={1.15} />
    <Text position={[0, 2.5, 0]} fontSize={0.4} color="#10b981" anchorX="center">Report Analyzer - Click to Upload</Text>
  </group>
);

const SyringeScene = ({ onClick }) => (
  <group position={[0, -24, 0]}>
    <ModelViewer path={MODEL_PATHS.syringe} position={[0, 0, 0]} scale={2.5} onClick={onClick} hoverScale={1.1} />
    <Text position={[0, 2.5, 0]} fontSize={0.4} color="#f59e0b" anchorX="center">Treatment Tracker - Click to View</Text>
  </group>
);

const PillsScene = ({ onClick }) => (
  <group position={[0, -32, 0]}>
    <ModelViewer path={MODEL_PATHS.pills} position={[0, 0, 0]} scale={2.5} onClick={onClick} hoverScale={1.1} />
    <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ef4444" anchorX="center">Medication Manager - Click to Manage</Text>
  </group>
);

export const DashboardScene = ({ currentPage, setCurrentPage }) => {
  const { openChat, openAnalyzer, openTracker, openMedication } = useUIStore();

  const handleDoctorClick = () => { setCurrentPage(0); openChat(); };
  const handleAnalyzerClick = () => { setCurrentPage(1); openAnalyzer(); };
  const handleTrackerClick = () => { setCurrentPage(2); openTracker(); };
  const handleMedicationClick = () => { setCurrentPage(3); openMedication(); };

  return (
    <>
      <SummaryView />
      <DoctorScene onClick={handleDoctorClick} />
      <StethoscopeScene onClick={handleAnalyzerClick} />
      <SyringeScene onClick={handleTrackerClick} />
      <PillsScene onClick={handleMedicationClick} />
    </>
  );
};
