import React from 'react';
import { MODEL_PATHS } from '../../../utils/modelPaths';
import { ModelViewer } from '../../common/ModelViewer';
import { useUIStore } from '../../../stores/uiStore';

export const StethoscopeScene = ({ position = [0, 0, 0] }) => {
  const { openAnalyzer } = useUIStore();

  return (
    <group position={position}>
      <ModelViewer
        path={MODEL_PATHS.stethoscope}
        scale={1.2}
        position={[0, -1, 0]}
        onClick={openAnalyzer}
        idleAnimation={true}
      />
    </group>
  );
};
