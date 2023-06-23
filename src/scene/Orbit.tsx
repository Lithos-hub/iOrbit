import { FC, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

import { ReactThreeFiber, extend } from "@react-three/fiber";

extend({ Line_: THREE.Line });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>;
    }
  }
}

interface Props {
  xRadius: number;
  zRadius: number;
  rotation: [number, number, number];
  isHovered: boolean;
}

const Orbit: FC<Props> = ({
  xRadius = 1,
  zRadius = 1,
  rotation = [0, 0, 0],
  isHovered,
}) => {
  const [lineGeometry, setLineGeometry] = useState<THREE.BufferGeometry>();
  const BASE = 128;

  const points = useMemo<THREE.Vector3[]>(() => {
    const points: THREE.Vector3[] = [];

    for (let index = 0; index < BASE; index++) {
      const angle = (index / BASE) * 2 * Math.PI;
      const x = xRadius * Math.cos(angle);
      const z = zRadius * Math.sin(angle);
      points.push(new THREE.Vector3(x, 0, z));
    }

    points.push(points[0]);

    return points;
  }, [BASE]);

  useEffect(() => {
    setLineGeometry(new THREE.BufferGeometry().setFromPoints(points));
  }, [points]);

  return (
    <line_ geometry={lineGeometry} rotation={rotation}>
      <lineBasicMaterial
        attach="material"
        color={isHovered ? "gold" : "#505050"}
      />
    </line_>
  );
};

export default Orbit;
