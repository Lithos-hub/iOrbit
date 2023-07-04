import { FC, useRef } from "react";

import * as THREE from "three";
import { Texture, TextureLoader } from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import { useAppSelector } from "@/hooks/useRedux";

interface Props {
  texture: Texture;
}

const Body: FC<Props> = ({ texture }) => {
  const bodyRef = useRef<THREE.Mesh>(null);
  const saturnRingRef = useRef<THREE.Mesh>(null);
  const saturnGroupRef = useRef<THREE.Group>(null);

  const selectedPlanet = useAppSelector(
    (state) => state.planet.selectedPlanetName
  );

  const saturnRingTexture = useLoader(
    TextureLoader,
    "/textures/saturn-ring.png"
  );

  useFrame(() => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y += 0.005;
    }
    if (saturnRingRef.current) {
      saturnRingRef.current.rotation.z += 0.005;
    }
    if (saturnGroupRef.current) {
      saturnGroupRef.current.rotation.y += 0.005;
    }
  });

  return selectedPlanet.toLowerCase().includes("saturn") ? (
    <group ref={saturnGroupRef} scale={0.5}>
      {/* Saturn body */}
      <mesh ref={bodyRef} receiveShadow castShadow>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshPhysicalMaterial map={texture} />
      </mesh>
      {/* Saturn ring using a torus */}
      <mesh
        ref={saturnRingRef}
        receiveShadow
        castShadow
        rotation={[1.3, -0.5, 0]}
      >
        <torusGeometry args={[2.5, 0.75, 2, 200]} />
        <meshBasicMaterial
          map={saturnRingTexture}
          alphaTest={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  ) : (
    <mesh scale={0.75} ref={bodyRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

export default Body;
