import { TextureLoader, BackSide } from "three";
import { Stars, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import { Loading, SolarSystem } from "@/scene";
import { Suspense } from "react";

const Experience = () => {
  const milkyWayTexture = useLoader(TextureLoader, "/textures/milkyway.jpg");

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black">
      <Suspense fallback={<Loading />}>
        <Canvas
          shadows
          camera={{
            fov: 25,
            aspect: window.innerWidth / window.innerHeight,
            position: [0, 5, -50],
            far: 1200,
          }}
        >
          <Stars
            radius={1}
            depth={500}
            count={20000}
            factor={10}
            saturation={0.5}
            fade
            speed={0.3}
          />

          <OrbitControls maxDistance={490} />

          {/* Stellarium background */}
          <mesh>
            <sphereGeometry args={[500, 64, 64]} />
            <meshBasicMaterial map={milkyWayTexture} side={BackSide} />
          </mesh>

          <EffectComposer>
            <DepthOfField
              focusDistance={0}
              focalLength={1.02}
              bokehScale={0.01}
              height={1080}
            />
            <Bloom mipmapBlur luminanceThreshold={0.5} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={0.9} />
          </EffectComposer>

          {/* Solar system */}

          <SolarSystem />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Experience;
