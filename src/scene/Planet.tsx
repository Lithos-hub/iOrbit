import { FC, useRef, useState, useEffect, useMemo } from "react";

import { TextureLoader } from "three";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";

import { PlanetModel } from "@/models";

import { Orbit } from ".";
import { useDispatch } from "react-redux";
import { selectPlanet } from "@/redux/slices/planetSlice";
import { useAppSelector } from "@/hooks/useRedux";

const Planet: FC<PlanetModel> = ({
  distance,
  name,
  size,
  speed,
  texture,
  inclination,
}) => {
  const { camera } = useThree();

  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const saturnRingRef = useRef<THREE.Mesh>(null);
  const planetAndOrbitGroupRef = useRef<any>(null);

  const dispatch = useDispatch();
  const selectedScale = useAppSelector((state) => state.planet.selectedScale);
  const selectedPlanetName = useAppSelector(
    (state) => state.planet.selectedPlanetName
  );
  const selectedOrbit = useAppSelector((state) => state.planet.selectedOrbit);

  const [isHovered, setIsHovered] = useState(false);

  const planetTexture = useLoader(TextureLoader, texture);

  const isHoveredOrSelected = useMemo(() => {
    return (
      isHovered || selectedPlanetName.toLowerCase().includes(name.toLowerCase())
    );
  }, [isHovered, selectedPlanetName, name]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;
    }

    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time * speed * 0.1) * distance;
      groupRef.current.position.z = Math.sin(time * speed * 0.1) * distance;
    }

    if (textRef.current) {
      textRef.current.lookAt(camera.position);
    }
    if (torusRef.current) {
      torusRef.current.lookAt(camera.position);
    }

    if (moonRef.current && selectedScale === "real") {
      moonRef.current.position.x = Math.cos(time * speed * 10) * 0.1;
      moonRef.current.position.z = Math.sin(time * speed * 10) * 0.1;
      moonRef.current.rotation.y += 0.001;
    } else if (moonRef.current && selectedScale === "same") {
      moonRef.current.position.x = Math.cos(time * speed * 5) * 2.5;
      moonRef.current.position.z = Math.sin(time * speed * 5) * 2.5;
      moonRef.current.rotation.y += 0.005;
    }

    if (saturnRingRef.current) {
      saturnRingRef.current.rotation.z += 0.005;
    }
  });

  const saturnRingTexture = useLoader(
    TextureLoader,
    "/textures/saturn-ring.png"
  );

  saturnRingTexture.rotation = Math.PI * 0.5;

  useEffect(() => {
    document.body.style.cursor = isHovered ? "pointer" : "auto";

    saturnRingTexture.rotation = Math.PI * 0.5;
  }, [isHovered, saturnRingTexture]);

  return (
    <group
      ref={planetAndOrbitGroupRef}
      rotation={selectedOrbit === "real" ? [0, 0, inclination] : [0, 0, 0]}
    >
      <group
        ref={groupRef}
        onClick={() =>
          dispatch(selectPlanet(name?.includes("Moon") ? "Earth" : name))
        }
      >
        {selectedScale === "real" && name !== "Moon" && (
          <>
            <mesh
              onPointerOver={() => setIsHovered(true)}
              onPointerOut={() => setIsHovered(false)}
            >
              <sphereGeometry args={[2.5, 64, 64]} />
              <meshBasicMaterial visible={false} />
            </mesh>
            <mesh ref={torusRef}>
              <torusGeometry args={[isHovered ? 2.75 : 2.5, 0.01, 10, 100]} />
              <meshBasicMaterial
                color={isHoveredOrSelected ? "gold" : "#909090"}
              />
            </mesh>
          </>
        )}

        <Center ref={textRef} position={[0, 7, 0]}>
          <Text3D
            position={[-2.5, isHovered ? 7 : 6, 0]}
            ref={textRef}
            font={"/fonts/roboto.json"}
            size={2}
            height={0.01}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.0005}
            bevelOffset={0}
            bevelSegments={1}
          >
            {name === "Moon" ? "" : name}
            <meshBasicMaterial
              color={isHoveredOrSelected ? "gold" : "#909090"}
            />
          </Text3D>
        </Center>

        {name === "Moon" ? (
          <mesh ref={moonRef} receiveShadow castShadow>
            <sphereGeometry
              args={[selectedScale === "real" ? size : 5 * 0.27, 64, 64]} // The Moon is 27% the size of Earth
            />
            <meshPhysicalMaterial map={planetTexture} />
          </mesh>
        ) : name !== "Saturn" ? (
          <>
            <mesh position={[0, isHovered ? 4 : 3.75, 0]}>
              <boxGeometry args={[0.01, 2, 0.01]} />
              <meshBasicMaterial
                color={
                  isHovered || selectedPlanetName.includes(name)
                    ? "gold"
                    : "#909090"
                }
              />
            </mesh>
            <mesh ref={planetRef} receiveShadow castShadow>
              <sphereGeometry
                args={[selectedScale === "real" ? size : 5, 64, 64]}
              />
              <meshPhysicalMaterial map={planetTexture} />
            </mesh>
          </>
        ) : (
          <>
            <mesh position={[0, isHovered ? 4 : 3.75, 0]}>
              <boxGeometry args={[0.01, 2, 0.01]} />
              <meshBasicMaterial
                color={
                  isHovered || selectedPlanetName.includes(name)
                    ? "gold"
                    : "#909090"
                }
              />
            </mesh>
            <mesh ref={planetRef} receiveShadow castShadow>
              <sphereGeometry
                args={[selectedScale === "real" ? size : 5, 64, 64]}
              />
              <meshPhysicalMaterial map={planetTexture} />
            </mesh>
            {/* Saturn ring using a torus */}
            <mesh
              ref={saturnRingRef}
              receiveShadow
              castShadow
              rotation={[1.3, -0.5, 0]}
            >
              <torusGeometry
                args={
                  selectedScale === "real"
                    ? [1.5, 0.5, 2, 200]
                    : [10, 3, 2, 200]
                }
              />
              <meshBasicMaterial
                map={saturnRingTexture}
                alphaTest={0.1}
                transparent
                opacity={0.9}
              />
            </mesh>
          </>
        )}
      </group>

      {name !== "Moon" && (
        <Orbit
          xRadius={distance}
          zRadius={distance}
          isHovered={isHoveredOrSelected}
        />
      )}
    </group>
  );
};

export default Planet;
