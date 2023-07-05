import { FC, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  selectOrbit,
  selectPlanet,
  selectScale,
} from "@/redux/slices/planetSlice";

import { OptionSelector } from ".";

import { Dropdown } from "@/components";
import { useGetPlanetsDataQuery } from "@/api";

interface Props {
  isOpened: boolean;
  close: () => void;
}

const Sidemenu: FC<Props> = ({ isOpened, close }) => {
  const dispatch = useAppDispatch();
  const selectedPlanetName = useAppSelector(
    (state) => state.planet.selectedPlanetName
  );

  const { data } = useGetPlanetsDataQuery(null);

  const onSelectScale = (scale: string) => {
    dispatch(selectScale(scale));
  };

  const onSelectOrbit = (orbit: string) => {
    dispatch(selectOrbit(orbit));
  };

  const onSelectBody = (bodyId: string) => dispatch(selectPlanet(bodyId));

  const planetsList = useMemo(() => {
    return data?.bodies
      .filter(({ isPlanet }) => isPlanet)
      .sort((a, b) => a.sideralOrbit - b.sideralOrbit) // => sorted by distance from the sun
      .map((body) => ({
        label: body.englishName,
        value: body.englishName.toLowerCase(),
      })) as { label: string; value: string }[];
  }, [data]);

  return (
    <>
      {isOpened && (
        <div
          className="flex items-center justify-between p-5 fixed top-0 w-full h-full z-40"
          onClick={close}
        />
      )}

      <nav
        className={`${
          isOpened ? "left-0" : "left-[-350px]"
        } bg-primary-3/10 text-white backdrop-blur-md p-5 h-screen fixed top-[57px] w-[350px] z-50 duration-500 shadow-xl border-r border-r-primary-1/10`}
      >
        <ul className="flex flex-col gap-5">
          <li className="flex flex-col gap-2.5">
            <strong className="text-primary-2">Scale</strong>
            <div className="flex gap-1 justify-between">
              <OptionSelector
                image="/img/scale-real.jpg"
                text="Realistic"
                value="real"
                type="scale"
                onSelect={() => onSelectScale("real")}
              />
              <OptionSelector
                image="/img/scale-same.jpg"
                text="Same size"
                value="same"
                type="scale"
                onSelect={() => onSelectScale("same")}
              />
            </div>
          </li>

          <li className="flex flex-col gap-2.5">
            <strong className="text-primary-2">Orbits</strong>
            <div className="flex gap-1 justify-between">
              <OptionSelector
                image="/img/orbit-real.jpg"
                text="Realistic"
                value="real"
                type="orbit"
                onSelect={() => onSelectOrbit("real")}
              />
              <OptionSelector
                image="/img/orbit-flat.jpg"
                text="Flat"
                value="flat"
                type="orbit"
                onSelect={() => onSelectOrbit("flat")}
              />
            </div>
          </li>

          <li className="flex flex-col gap-2.5">
            <strong className="text-primary-2">Focus planet</strong>
            <Dropdown
              options={planetsList}
              selection={selectedPlanetName}
              onSelect={(value) => onSelectBody(value)}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidemenu;
