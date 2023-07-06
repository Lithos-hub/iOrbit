import { useMemo, FC } from "react";

import * as THREE from "three";

import { useLoader } from "@react-three/fiber";

import { AsteroidBelt, Planet, Sun } from "@/scene";
import { PlanetModel } from "@/models";
import { Text3D } from "@react-three/drei";

/* 
    Sun and planets relative sizes

    Sun – 432,288mi (695,508km) radius; 109x Earth’s size
    Mercury – 1,516mi (2,440km) radius; about 1/3 the size of Earth
    Venus – 3,760mi (6,052km) radius; only slightly smaller than Earth
    Earth – 3,959mi (6,371km) radius
    Mars – 2,106mi (3,390km) radius; about half the size of Earth
    Jupiter – 43,441mi (69,911km) radius; 11x Earth’s size
    Saturn – 36,184mi (58,232km) radius; 9x larger than Earth
    Uranus – 15,759mi (25,362km) radius; 4x Earth’s size
    Neptune – 15,299mi (24,622km) radius; only slightly smaller than Uranus

    --------------------------------------------

    Sun and planets inclinations

    Mercury – 7°
    Venus – 3.4°
    Earth – 0°
    Mars – 1.9°
    Jupiter – 1.3°
    Saturn – 2.5°
    Uranus – 0.8°
    Neptune – 1.8°

    --------------------------------------------

    Sun and planets relative distances

    Mercury – 36 million miles (58 million km) from the Sun
    Venus – 67 million miles (108 million km) from the Sun
    Earth – 93 million miles (150 million km) from the Sun
    Mars – 142 million miles (228 million km) from the Sun
    Jupiter – 484 million miles (778 million km) from the Sun
    Saturn – 887 million miles (1.4 billion km) from the Sun
    Uranus – 1.8 billion miles (2.9 billion km) from the Sun
    Neptune – 2.8 billion miles (4.5 billion km) from the Sun

    ---------------------------------------------

    Sun and planets axis tilt

    Mercury – 0.01°
    Venus – 177.3°
    Earth – 23.5°
    Mars – 25.2°
    Jupiter – 3.1°
    Saturn – 26.7°
    Uranus – 97.8°
    Neptune – 28.3°
*/

const SolarSystem: FC = () => {
  const SIZE_FACTOR = 100;
  const DISTANCE_FACTOR = 2;

  const sunTexture = useLoader(THREE.TextureLoader, "/textures/sun.jpg");

  const planets: PlanetModel[] = useMemo(
    () => [
      {
        name: "Mercury",
        distance: 36 / DISTANCE_FACTOR,
        size: 2.44 / SIZE_FACTOR,
        texture: "/textures/mercury.jpg",
        tilt: 0.01,
        speed: 0.5,
        inclination: 7,
      },
      {
        name: "Venus",
        distance: 67 / DISTANCE_FACTOR,
        size: 6.052 / SIZE_FACTOR,
        texture: "/textures/venus.jpg",
        tilt: 177.3,
        speed: 0.3,
        inclination: 3.4,
      },
      {
        name: "Earth",
        distance: 93 / DISTANCE_FACTOR,
        size: 6.371 / SIZE_FACTOR,
        texture: "/textures/earth.jpg",
        tilt: 23.5,
        speed: 0.2,
        inclination: 0,
      },
      {
        name: "Moon",
        distance: 93 / DISTANCE_FACTOR,
        size: 1.737 / SIZE_FACTOR,
        texture: "/textures/moon.jpg",
        tilt: 23.5,
        speed: 0.2,
        inclination: 0,
        distanceMoonFromEarth: (6.371 / SIZE_FACTOR) * 30, // The Moon is an average of 238,855 miles away from Earth, which is about 30 Earths away.
      },
      {
        name: "Mars",
        distance: 142 / DISTANCE_FACTOR,
        size: 3.39 / SIZE_FACTOR,
        texture: "/textures/mars.jpg",
        tilt: 25.2,
        speed: 0.1,
        inclination: 1.9,
      },
      {
        name: "Jupiter",
        distance: 484 / DISTANCE_FACTOR,
        size: 69.911 / SIZE_FACTOR,
        texture: "/textures/jupiter.jpg",
        tilt: 3.1,
        speed: 0.05,
        inclination: 1.3,
      },
      {
        name: "Saturn",
        distance: 887 / DISTANCE_FACTOR,
        size: 58.232 / SIZE_FACTOR,
        texture: "/textures/saturn.jpg",
        tilt: 26.7,
        speed: 0.02,
        inclination: 2.5,
      },
      {
        name: "Uranus",
        distance: 1800 / DISTANCE_FACTOR,
        size: 25.362 / SIZE_FACTOR,
        texture: "/textures/uranus.jpg",
        tilt: 97.8,
        speed: 0.01,
        inclination: 0.8,
      },
      {
        name: "Neptune",
        distance: 2800 / DISTANCE_FACTOR,
        size: 24.622 / SIZE_FACTOR,
        texture: "/textures/neptune.jpg",
        tilt: 28.3,
        speed: 0.005,
        inclination: 1.8,
      },
    ],

    [DISTANCE_FACTOR]
  );

  return (
    <>
      {/* Sun */}
      <Sun
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        texture={sunTexture}
        size={432.288 / SIZE_FACTOR}
      />

      <pointLight position={[0, 0, 0]} intensity={1} />

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}

      {/* Asteroid belt */}
      <Text3D
        position={[50, 0, 220 / DISTANCE_FACTOR]}
        rotation={[Math.PI * 0.5, Math.PI, 0]}
        font={"/fonts/roboto.json"}
        size={15}
        height={0.01}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.0005}
        bevelOffset={0}
        bevelSegments={1}
      >
        Asteroid belt
        <meshBasicMaterial color={"gold"} />
      </Text3D>
      <AsteroidBelt count={15000} distance={220 / DISTANCE_FACTOR} />

      {/* Kuiper belt */}
      <Text3D
        position={[550, 0, 4000 / DISTANCE_FACTOR]}
        rotation={[Math.PI * 0.5, Math.PI, 0]}
        font={"/fonts/roboto.json"}
        size={200}
        height={0.01}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.0005}
        bevelOffset={0}
        bevelSegments={1}
      >
        Kuiper belt
        <meshBasicMaterial color={"gold"} />
      </Text3D>

      <AsteroidBelt count={70000} distance={3800 / DISTANCE_FACTOR} />
    </>
  );
};

export default SolarSystem;
