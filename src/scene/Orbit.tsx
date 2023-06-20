import { FC } from "react";
import * as THREE from "three";

interface Props {
  xRadius: number;
  zRadius: number;
  rotation: [number, number, number];
}

const Orbit: FC<Props> = ({
  xRadius = 1,
  zRadius = 1,
  rotation = [0, 0, 0],
}) => {
  const points = [];
  const BASE = 128;

  for (let index = 0; index < BASE; index++) {
    const angle = (index / BASE) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry} rotation={rotation}>
      <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
    </line>
  );
};

export default Orbit;
