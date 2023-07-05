import { FC, useRef } from "react";

import * as THREE from "three";
import { Texture, TextureLoader } from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import { useAppSelector } from "@/hooks/useRedux";

import { motion } from "framer-motion-3d";
import { Body } from "@/models";

interface Props {
  texture: Texture;
  info: Body;
}

const BodyScene: FC<Props> = ({ texture, info }) => {
  const bodyRef = useRef<THREE.Mesh>(null);
  const bodyAxisRef = useRef<THREE.Mesh>(null);

  const saturnRingRef = useRef<THREE.Mesh>(null);

  const saturnGroupRef = useRef<any>(null);

  const selectedPlanet = useAppSelector(
    (state) => state.planet.selectedPlanetName
  );

  const saturnRingTexture = useLoader(
    TextureLoader,
    "/textures/saturn-ring.png"
  );

  useFrame(() => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y += 0.01;
    }
    if (saturnRingRef.current) {
      saturnRingRef.current.rotation.z += 0.05;
    }
  });

  return selectedPlanet.toLowerCase().includes("saturn") ? (
    <motion.group
      initial={{
        scale: 0.25,
        opacity: 0,
      }}
      animate={{
        scale: 0.75,
        opacity: 1,
      }}
      transition={{
        duration: 2,
      }}
      ref={saturnGroupRef}
      scale={0.5}
      rotation={[0, 0, THREE.MathUtils.degToRad(info.axialTilt)]}
    >
      {/* Axial tilt */}
      <mesh ref={bodyAxisRef} rotation={[0, 0, Math.PI * -0.5]}>
        <boxGeometry args={[4, 0.01, 0.01]} />
        <meshBasicMaterial color={"#726e97"} />
      </mesh>
      {/* Saturn body */}
      <mesh ref={bodyRef} receiveShadow castShadow>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshPhysicalMaterial map={texture} />
      </mesh>
      {/* Saturn ring using a torus */}
      <mesh ref={saturnRingRef} receiveShadow castShadow rotation={[1.5, 0, 0]}>
        <torusGeometry args={[2.5, 0.75, 2, 200]} />
        <meshBasicMaterial
          map={saturnRingTexture}
          alphaTest={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </motion.group>
  ) : (
    <motion.group
      initial={{
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 2,
      }}
      ref={saturnGroupRef}
      scale={0.5}
      rotation={[0, 0, THREE.MathUtils.degToRad(info.axialTilt)]}
    >
      {/* Axial tilt */}
      <mesh ref={bodyAxisRef} rotation={[0, 0, Math.PI * -0.5]}>
        <boxGeometry args={[4, 0.01, 0.01]} />
        <meshBasicMaterial color={"#726e97"} />
      </mesh>
      <mesh ref={bodyRef} scale={0.75}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshPhysicalMaterial map={texture} />
      </mesh>
    </motion.group>
  );
};

export default BodyScene;
