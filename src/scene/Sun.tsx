import * as THREE from "three";

import { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";

interface Props {
  texture: THREE.Texture;
  size: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Sun: FC<Props> = ({ texture, size, position, rotation }) => {
  const sunMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });
  return (
    <mesh ref={sunRef} position={position} rotation={rotation}>
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
