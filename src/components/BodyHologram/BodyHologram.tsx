import { FC, Suspense, useMemo } from "react";
import { useAppSelector } from "@/hooks/useRedux";

import { TextureLoader } from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { Body } from ".";

const BodyHologram: FC = () => {
  const selectedPlanetName = useAppSelector(
    (state) => state.planet.selectedPlanetName
  );

  const isSidemenuOpened = useAppSelector((state) => state.ui.isOpenedSidemenu);

  const texture = useMemo(() => {
    return useLoader(
      TextureLoader,
      `/textures/${selectedPlanetName.toLowerCase()}.jpg`
    );
  }, [selectedPlanetName]);

  return (
    <div
      className={`fixed bottom-5 ${
        isSidemenuOpened ? "left-[375px]" : "left-5"
      } duration-500`}
    >
      <div className="backdrop-blur border border-primary-1/50 h-[400px] w-[400px] relative">
        <h2 className="text-3xl p-5 absolute top-0 left-0 text-primary-2 capitalize">
          {selectedPlanetName}
        </h2>

        <div className="absolute top-0 left-0 w-full h-full">
          <Suspense fallback={null}>
            <Canvas
              shadows
              camera={{
                fov: 45,
                aspect: 500 / 500,
                position: [0, 0, -5],
                far: 100,
              }}
            >
              <directionalLight position={[5, 0, -5]} intensity={1} />
              <Body texture={texture} />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BodyHologram;
