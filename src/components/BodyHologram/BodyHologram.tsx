import { FC, Suspense, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

import { Texture, TextureLoader } from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { Body } from "@/models";
import { BodyScene } from ".";
import { Button } from "..";
import { toggleTracking } from "@/redux/slices/planetSlice";

interface Props {
  info: Body;
}

const BodyHologram: FC<Props> = ({ info }) => {
  const dispatch = useAppDispatch();
  const isSidemenuOpened = useAppSelector((state) => state.ui.isSidemenuOpened);

  const isTracking = useAppSelector((state) => state.planet.isTracking);

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
    <section
      className={`fixed bottom-5 ${
        isSidemenuOpened ? "left-[375px]" : "left-5"
      } duration-500`}
    >
      <article className="backdrop-blur border border-primary-1/50 h-[400px] w-[400px] relative">
        <header className="flex p-5 justify-between w-full absolute top-0 left-0">
          <h2 className="text-3xl text-primary-2 capitalize">
            {info.englishName}
          </h2>
          <div className="flex gap-2.5 text-white items-center">
            <div className="p-2 w-[18px] h-[18px] rounded-full bg-primary-3" />
            <small>Axial tilt</small>
          </div>
        </header>
        <main className="absolute top-0 left-0 w-full h-full">
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
        </main>
        <footer className="absolute bottom-0 w-full p-5 flex justify-end">
          <Button
            variant={isTracking ? "success" : "secondary"}
            effect={isTracking ? "pulse" : undefined}
            onClick={() => dispatch(toggleTracking())}
          >
            <small>{isTracking ? "Tracking" : "Start tracking"}</small>
          </Button>
        </footer>
      </article>
    </section>
  );
};

export default BodyHologram;
