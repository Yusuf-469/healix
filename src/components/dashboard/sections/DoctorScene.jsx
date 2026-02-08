import React from 'react';
import { MODEL_PATHS } from '../../../utils/modelPaths';
import { ModelViewer } from '../../common/ModelViewer';
import { useUIStore } from '../../../stores/uiStore';

export const DoctorScene = ({ position = [0, 0, 0] }) => {
  const { openChat } = useUIStore();

  return (
    <group position={position}>
      <ModelViewer
        path={MODEL_PATHS.doctor}
        scale={1.2}
        position={[0, -1.5, 0]}
        onClick={openChat}
        idleAnimation={true}
      />
    </group>
  );
};
