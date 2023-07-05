import { useMemo, useState } from "react";

import { Experience } from "@/scene";
import { InformationCard, Navbar, BodyHologram } from "@/components";

import { Sidemenu } from "@/components";

import { useGetPlanetsDataQuery } from "@/api";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { Body } from "./models";
import { selectPlanet } from "./redux/slices/planetSlice";
import { toggleSidemenu } from "./redux/slices/uiSlice";

function App() {
  const [isShowingInfoCard, setIsShowingInfoCard] = useState(false);

  const isSidemenuOpened = useAppSelector((state) => state.ui.isOpenedSidemenu);
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
      {/* Information card */}
      {isShowingInfoCard && (
        <InformationCard
          planet={planetInfo as Body}
          collapse={onCollapseInfoCard}
        />
      )}
      {/* Three.js canvas */}
      <Experience />

      {/* WIP banner */}
      <small className="fixed z-50 bottom-5 right-5 text-red-500">WIP</small>

      {/* Body hologram */}
      {planetInfo && <BodyHologram info={planetInfo} />}
    </>
  );
}

export default App;
