import { useFrame } from "@react-three/fiber";
import { FC, useMemo, useRef } from "react";
import * as THREE from "three";

interface Props {
  distance: number;
  count: number;
}

const AsteroidBelt: FC<Props> = ({ distance, count = 10000 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Here we create a random set of points in a torus shape taking the count as the number of points

  const torusPointsGeometry = useMemo(() => {
    const points = [];

    for (let index = 0; index < count; index++) {
      const angle = (index / count) * 2 * Math.PI;
      const x = (Math.random() + 0.75) * distance * Math.cos(angle);
      const z = (Math.random() + 0.75) * distance * Math.sin(angle);
      const y =
        (Math.random() - 0.5) * ((Math.random() - 0.5) * (Math.random() * 50));
      points.push(new THREE.Vector3(x, y, z));
    }

    const torusPointsGeometry = new THREE.BufferGeometry().setFromPoints(
      points
    );

    return torusPointsGeometry;
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <points ref={pointsRef}>
      <pointsMaterial attach="material" color={0x505050} size={0.005} />
      <bufferGeometry attach="geometry" {...torusPointsGeometry} />
    </points>
  );
};

export default AsteroidBelt;
