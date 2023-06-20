import * as THREE from "three";

import { FC, useRef } from "react";

interface Props {
  texture: THREE.Texture;
  size: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Sun: FC<Props> = ({ texture, size, position, rotation }) => {
  const sunMaterialRef = useRef<THREE.MeshBasicMaterial>(null);

  return (
    <mesh position={position} rotation={rotation}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshBasicMaterial
        ref={sunMaterialRef}
        color={[8, 5, 12]}
        toneMapped={false}
        map={texture}
      />
    </mesh>
  );
};

export default Sun;
