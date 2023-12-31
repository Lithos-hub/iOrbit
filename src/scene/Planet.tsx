import { FC, useRef, useState, useEffect, useMemo } from "react";

import { TextureLoader } from "three";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { Center, Text3D } from "@react-three/drei";

import { PlanetModel } from "@/models";

import { Orbit } from ".";

import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/useRedux";
import { selectPlanet } from "@/redux/slices/planetSlice";

const SAME_SIZE_SCALE = 5;

const Planet: FC<PlanetModel> = ({
  distance,
  name,
  size,
  speed,
  texture,
  tilt,
  inclination,
  distanceMoonFromEarth,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const moonGroupRef = useRef<THREE.Group>(null);
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
  const isTracking = useAppSelector((state) => state.planet.isTracking);

  const [isHovered, setIsHovered] = useState(false);

  const planetTexture = useLoader(TextureLoader, texture);

  const isHoveredOrSelected = useMemo(
    () =>
      isHovered ||
      selectedPlanetName.toLowerCase().includes(name.toLowerCase()),

    [isHovered, selectedPlanetName, name]
  );

  const selectedGroupRef = useMemo(() => {
    if (
      isTracking &&
      selectedPlanetName.toLowerCase().includes(name.toLowerCase())
    ) {
      return groupRef.current;
    }
  }, [isTracking, selectedPlanetName, name]);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();

    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;

      planetRef.current.rotation.z = THREE.MathUtils.degToRad(tilt);
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

    if (
      moonGroupRef.current &&
      selectedScale === "real" &&
      distanceMoonFromEarth
    ) {
      moonGroupRef.current.position.x =
        Math.cos(time * speed * 2) * distanceMoonFromEarth;
      moonGroupRef.current.position.z =
        Math.sin(time * speed * 2) * distanceMoonFromEarth;
      moonGroupRef.current.rotation.y += 0.001;
    } else if (
      moonGroupRef.current &&
      selectedScale === "same" &&
      distanceMoonFromEarth
    ) {
      moonGroupRef.current.position.x =
        Math.cos(time * speed * 0.5 * SAME_SIZE_SCALE) *
        SAME_SIZE_SCALE *
        distanceMoonFromEarth;
      moonGroupRef.current.position.z =
        Math.sin(time * speed * 0.5 * SAME_SIZE_SCALE) *
        SAME_SIZE_SCALE *
        distanceMoonFromEarth;
      moonGroupRef.current.rotation.y += 0.005;
    }

    if (saturnRingRef.current) {
      saturnRingRef.current.rotation.z += 0.005;
    }

    if (isTracking && selectedGroupRef) {
      const planetPosition = new THREE.Vector3();
      selectedGroupRef.getWorldPosition(planetPosition);

      // Make the camera rotate around the planet
      const x = Math.sin(time * 0.1) * 3;
      const y = 2;
      const z = selectedScale === "same" ? 20 : 3;
      camera.position.copy(planetPosition).add(new THREE.Vector3(x, y, z));

      camera.lookAt(planetPosition);
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

  const onSelectPlanet = () => {
    dispatch(selectPlanet(name?.includes("Moon") ? "Earth" : name));
  };

  return (
    <group
      ref={planetAndOrbitGroupRef}
      rotation={selectedOrbit === "real" ? [0, 0, inclination] : [0, 0, 0]}
    >
      <group ref={groupRef} onClick={() => onSelectPlanet()}>
        {selectedScale === "real" && name !== "Moon" && (
          <>
            <mesh
              onPointerOver={() => setIsHovered(true)}
              onPointerOut={() => setIsHovered(false)}
            >
              <sphereGeometry args={[SAME_SIZE_SCALE * 0.5, 64, 64]} />
              <meshBasicMaterial visible={false} />
            </mesh>
            <mesh ref={torusRef}>
              <torusGeometry
                args={[isHovered ? 2.75 : SAME_SIZE_SCALE * 0.5, 0.01, 10, 100]}
              />
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
          <group ref={moonGroupRef}>
            <Center
              ref={textRef}
              position={[0, selectedScale === "real" ? 1.5 : 2, 0]}
            >
              <Text3D
                position={[-0.75, 1, 0]}
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
                The Moon
                <meshBasicMaterial color="#726e97" />
              </Text3D>
            </Center>
            <mesh position={[0, 0.75, 0]}>
              <boxGeometry args={[0.01, 1, 0.01]} />
              <meshBasicMaterial color="#726e97" />
            </mesh>
            <mesh receiveShadow castShadow>
              <sphereGeometry
                args={[
                  selectedScale === "real" ? size : SAME_SIZE_SCALE * 0.27, // The Moon is 27% the size of Earth
                  64,
                  64,
                ]}
              />
              <meshStandardMaterial map={planetTexture} />
            </mesh>
          </group>
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
            <mesh name="planetMesh" ref={planetRef} receiveShadow castShadow>
              <sphereGeometry
                args={[
                  selectedScale === "real" ? size : SAME_SIZE_SCALE,
                  64,
                  64,
                ]}
              />
              <meshPhysicalMaterial map={planetTexture} />
            </mesh>
            {/* Saturn ring */}
            {name === "Saturn" && (
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
            )}
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
