import { useMemo, useState } from "react";

import { Experience } from "@/scene";
import {
  InformationCard,
  Navbar,
  BodyHologram,
  Dialog,
  Button,
  Icon,
} from "@/components";

import { Sidemenu } from "@/components";

import { useGetPlanetsDataQuery } from "@/api";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { Body } from "./models";
import { selectPlanet } from "./redux/slices/planetSlice";
import { toggleSidemenu, toggleTutorial } from "./redux/slices/uiSlice";

const TutorialBody = () => {
  return (
    <>
      <p>iOrbit is a simple 3D solar system simulation. </p>

      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-col gap-5 flex-1 border p-5 bg-secondary-1 text-primary-1">
          <Icon name="mouse-click" className="h-20 w-40 self-center" />
          <small className="text-center text-sm">
            Click on any planet to get more information about it, also you can
            click and drag to rotate the camera around the sun.
          </small>
        </div>

        <div className="flex flex-col gap-5 flex-1 border p-5 bg-secondary-1 text-primary-1">
          <Icon name="mouse-scroll" className="h-20 w-40 self-center" />
          <small className="text-center text-sm">
            With the scroll wheel you can zoom in and out of the solar system.
          </small>
        </div>
      </div>

      <p>
        In the <strong>side menu</strong>{" "}
        <Icon name="menu" className="h-6 w-6 inline-block mx-2" />
        you can <strong>select different options</strong> such as the{" "}
        <strong>size of the planets or the type of the orbit</strong>.{" "}
      </p>

      <div className="flex flex-wrap justify-center gap-2 items-center">
        <img src="/img/scale-real.jpg" className="h-[100px]" />
        <img src="/img/scale-same.jpg" className="h-[100px]" />

        <img src="/img/orbit-real.jpg" className="h-[100px]" />
        <img src="/img/orbit-flat.jpg" className="h-[100px]" />
      </div>
      <p>
        Also, you can <strong>select a planet using a selector</strong>. The
        effect will be the same as clicking on the planet.
      </p>
    </>
  );
};

function App() {
  const [isShowingInfoCard, setIsShowingInfoCard] = useState(false);

  const isSidemenuOpened = useAppSelector((state) => state.ui.isSidemenuOpened);
  const isTutorialOpened = useAppSelector((state) => state.ui.isTutorialOpened);
  const selectedPlanetName = useAppSelector(
    (state) => state.planet.selectedPlanetName
  );

  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetPlanetsDataQuery(null);

  const planetInfo = useMemo(() => {
    if (isLoading || error) return null;

    const match = data?.bodies.find((body) =>
      selectedPlanetName.includes("Earth")
        ? body.englishName.toLowerCase() === "earth"
        : body.englishName.toLowerCase() === selectedPlanetName.toLowerCase()
    ) as Body;

    if (match) setIsShowingInfoCard(true);

    return match;
  }, [selectedPlanetName]);

  const onCollapseInfoCard = () => {
    setIsShowingInfoCard(false);
    dispatch(selectPlanet(""));
  };
  return (
    <>
      <Navbar onOpenSidemenu={() => dispatch(toggleSidemenu())} />
      <Sidemenu
        isOpened={isSidemenuOpened}
        close={() => dispatch(toggleSidemenu())}
      />
      {/* Tutorial dialog */}
      {isTutorialOpened && (
        <Dialog
          title="How it works iOrbit"
          className="w-auto"
          footer={
            <Button
              variant="primary"
              onClick={() => dispatch(toggleTutorial())}
            >
              I get it!
            </Button>
          }
        >
          <TutorialBody />
        </Dialog>
      )}
      {/* Information card */}
      {isShowingInfoCard && (
        <InformationCard
          planet={planetInfo as Body}
          collapse={onCollapseInfoCard}
        />
      )}
      {/* Three.js canvas */}
      <Experience />

      {/* Body hologram */}
      {planetInfo && <BodyHologram info={planetInfo} />}
    </>
  );
}

export default App;
