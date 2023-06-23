import { FC, useRef, useState, useEffect } from "react";

import { TextureLoader } from "three";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";

import { PlanetModel } from "@/models";

import { Orbit } from ".";
import { useDispatch } from "react-redux";
import { selectPlanet } from "@/redux/slices/planetSlice";

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
  const planetCircleRef = useRef<THREE.Mesh>(null);
  const planetSphereRef = useRef<THREE.Mesh>(null);

  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const camera = useThree((state) => state.camera);

  const planetTexture = useLoader(TextureLoader, texture);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * speed * 0.1) * distance;
      groupRef.current.position.z = Math.sin(time * speed * 0.1) * distance;
      groupRef.current.lookAt(camera.position);
    }

    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(time * speed * 10) * 0.1;
      moonRef.current.position.z = Math.sin(time * speed * 10) * 0.1;
    }
  });

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";
  }, [isHovered]);

  return (
    <>
      <group ref={groupRef} onClick={() => dispatch(selectPlanet(name))}>
        <mesh
          ref={planetSphereRef}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
        >
          <sphereGeometry args={[0.5, 64, 64]} />
          <meshBasicMaterial
            visible={false}
            color={isHovered ? "gold" : "#909090"}
          />
        </mesh>
        <mesh ref={planetCircleRef}>
          <torusGeometry args={[isHovered ? 0.6 : 0.5, 0.01, 10, 100]} />
          <meshBasicMaterial color={isHovered ? "gold" : "#909090"} />
        </mesh>

        <Center position={[0, 2, 0]}>
          <Text3D
            position={[0, isHovered ? 0.5 : 0.25, 0]}
            ref={textRef}
            font={"/fonts/roboto.json"}
            size={0.75}
            height={0.01}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.0005}
            bevelOffset={0}
            bevelSegments={1}
          >
            {name}
            <meshBasicMaterial color={isHovered ? "gold" : "#909090"} />
          </Text3D>
        </Center>

        {name === null ? (
          <mesh ref={moonRef} receiveShadow castShadow>
            <sphereGeometry args={[size, 64, 64]} />
            <meshPhysicalMaterial map={planetTexture} />
          </mesh>
        ) : (
          <>
            <mesh position={[0, isHovered ? 0.85 : 0.75, 0]}>
              <boxGeometry args={[0.01, 0.45, 0.01]} />
              <meshBasicMaterial color={isHovered ? "gold" : "#909090"} />
            </mesh>
            <mesh ref={planetRef} receiveShadow castShadow>
              <sphereGeometry args={[size, 64, 64]} />
              <meshPhysicalMaterial map={planetTexture} />
            </mesh>
          </>
        )}
      </group>

      <Orbit
        xRadius={distance}
        zRadius={distance}
        isHovered={isHovered}
        rotation={[0, 0, 0]}
      />
    </>
  );
};

export default Planet;
