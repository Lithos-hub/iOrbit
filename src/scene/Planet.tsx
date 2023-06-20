import { FC, useRef, Suspense } from "react";

import { TextureLoader } from "three";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text3D } from "@react-three/drei";

import { PlanetModel } from "@/models";

import { Orbit } from ".";

const Planet: FC<PlanetModel> = ({
  distance,
  name,
  size,
  speed,
  texture,
  tilt,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh>(null);

  const planetTexture = useLoader(TextureLoader, texture);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * speed * 0.1) * distance;
      groupRef.current.position.z = Math.sin(time * speed * 0.1) * distance;
    }

    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(time * speed * 10) * 0.1;
      moonRef.current.position.z = Math.sin(time * speed * 10) * 0.1;
    }
  });

  return (
    <>
      <Suspense fallback={null}>
        <group ref={groupRef}>
          <Text3D
            rotation={[0, Math.PI, 0]}
            position={[0, 1, 0]}
            ref={textRef}
            font={"/fonts/roboto.json"}
            size={0.25}
            height={0.01}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.0005}
            bevelOffset={0}
            bevelSegments={1}
          >
            {name}
            <meshBasicMaterial color={"gold"} />
          </Text3D>

          {!name ? (
            <mesh ref={moonRef} receiveShadow castShadow>
              <sphereGeometry args={[size, 64, 64]} />
              <meshPhysicalMaterial map={planetTexture} />
            </mesh>
          ) : (
            <>
              <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.01, 0.8, 0.01]} />
                <meshBasicMaterial color="gold" />
              </mesh>
              <mesh ref={planetRef} receiveShadow castShadow>
                <sphereGeometry args={[size, 64, 64]} />
                <meshPhysicalMaterial map={planetTexture} />
              </mesh>
            </>
          )}
        </group>
      </Suspense>

      <Orbit xRadius={distance} zRadius={distance} rotation={[0, 0, 0]} />
    </>
  );
};

export default Planet;
