import * as THREE from "three";

import { FC, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppSelector } from "@/hooks/useRedux";

interface Props {
  texture: THREE.Texture;
  size: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Sun: FC<Props> = ({ texture, size, position, rotation }) => {
  const sunMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const sunRef = useRef<THREE.Mesh>(null);
  const sunEffectsRef = useRef<THREE.Mesh>(null);

  const selectedScale = useAppSelector((state) => state.planet.selectedScale);

  useFrame(() => {
    if (sunRef.current && sunEffectsRef.current) {
      sunRef.current.rotation.y += 0.001;
      sunRef.current.rotation.x += 0.001;
      sunRef.current.rotation.z -= 0.001;

      sunEffectsRef.current.rotation.y -= 0.001;
      sunEffectsRef.current.rotation.x -= 0.001;
      sunEffectsRef.current.rotation.z += 0.001;
    }
  });
  return (
    <>
      <mesh ref={sunRef} position={position} rotation={rotation}>
        <sphereGeometry
          args={[selectedScale === "real" ? size + 0.04 : 5.03, 64, 64]}
        />
        <meshBasicMaterial
          ref={sunMaterialRef}
          color={[1, 5.5, 20.5]}
          toneMapped={true}
          map={texture}
          opacity={2}
        />
      </mesh>
      <mesh ref={sunEffectsRef} position={position} rotation={rotation}>
        <sphereGeometry
          args={[selectedScale === "real" ? size + 0.06 : 5.05, 64, 64]}
        />
        <meshBasicMaterial
          color={[2, 2.9, 1.8]}
          toneMapped={true}
          map={texture}
          transparent
          opacity={1.26}
        />
      </mesh>
    </>
  );
};

export default Sun;
