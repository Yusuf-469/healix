import React from 'react';
import { MODEL_PATHS } from '../../../utils/modelPaths';
import { ModelViewer } from '../../common/ModelViewer';
import { useUIStore } from '../../../stores/uiStore';

export const SyringeScene = ({ position = [0, 0, 0] }) => {
  const { openTracker } = useUIStore();

  return (
    <group position={position}>
      <ModelViewer
        path={MODEL_PATHS.syringe}
        scale={1.2}
        position={[0, -1, 0]}
        onClick={openTracker}
        idleAnimation={true}
      />
    </group>
  );
};
