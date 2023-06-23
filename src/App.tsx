import { useMemo, useState } from "react";

import { Experience } from "@/scene";
import { InformationCard, Navbar } from "@/components";
import Sidemenu from "./components/Sidemenu";

import { useGetPlanetsDataQuery } from "@/api";
import { useAppSelector } from "./hooks/useRedux";
import { Body } from "./models";

function App() {
  const [isSidemenuOpened, setIsSidemenuOpened] = useState(false);

  const selectedPlanet = useAppSelector((state) => state.planet.selectedPlanet);

  const { data, error, isLoading } = useGetPlanetsDataQuery(null);

  const planetInfo = useMemo(() => {
    if (isLoading || error) return null;

    return data?.bodies.find((body) => body.name === selectedPlanet) as Body;
  }, [selectedPlanet]);

  return (
    <>
      <Navbar open={() => setIsSidemenuOpened(!isSidemenuOpened)} />
      <Sidemenu
        isOpened={isSidemenuOpened}
        close={() => setIsSidemenuOpened(false)}
      />
      {/* Information card */}
      {planetInfo && <InformationCard planet={planetInfo as Body} />}
      <Experience />
    </>
  );
}

export default App;
