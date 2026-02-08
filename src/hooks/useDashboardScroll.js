import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';

export const useDashboardScroll = () => {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useFrame(() => {
    // Camera follows scroll position
    // Add smooth interpolation here if needed
  });

  return scrollRef;
};
