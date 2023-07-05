import { FC, Suspense, useMemo } from "react";
import { useAppSelector } from "@/hooks/useRedux";

import { Texture, TextureLoader } from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { Body } from "@/models";
import { BodyScene } from ".";

interface Props {
  info: Body;
}

const BodyHologram: FC<Props> = ({ info }) => {
  const isSidemenuOpened = useAppSelector((state) => state.ui.isOpenedSidemenu);

  const texture: Texture = useMemo(
    () =>
      info
        ? useLoader(
            TextureLoader,
            `/textures/${info.englishName.toLowerCase()}.jpg`
          )
        : undefined,
    [info]
  );

  return (
    <div
      className={`fixed bottom-5 ${
        isSidemenuOpened ? "left-[375px]" : "left-5"
      } duration-500`}
    >
      <div className="backdrop-blur border border-primary-1/50 h-[400px] w-[400px] relative">
        <div className="flex p-5 justify-between w-full absolute top-0 left-0">
          <h2 className="text-3xl text-primary-2 capitalize">
            {info.englishName}
          </h2>
          <div className="flex gap-2.5 text-white items-center">
            <div className="p-2 w-[18px] h-[18px] rounded-full bg-primary-3" />
            <small>Axial tilt</small>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <Suspense fallback={null}>
            <Canvas
              shadows
              camera={{
                fov: 45,
                aspect: 500 / 500,
                position: [0, 0, -5],
                far: 10,
              }}
            >
              <directionalLight position={[10, 0, -5]} intensity={1} />
              <BodyScene texture={texture} info={info} />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BodyHologram;
