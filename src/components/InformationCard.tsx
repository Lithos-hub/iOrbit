import { Body } from "@/models";
import { FC } from "react";

interface Props {
  planet: Body;
}

const InformationCard: FC<Props> = ({ planet }) => {
  return (
    planet && (
      <div className="fixed top-20 right-10 z-50 p-4 text-primary-1 backdrop-blur border border-primary-1/10">
        <h1 className="text-xl font-bold text-secondary-6">
          {planet.englishName}
        </h1>
        <hr className="border-primary-1/10 my-5" />
        <ul>
          <li>
            <strong>Avg. temperature: </strong>{" "}
            <span className="text-primary-2">{planet.avgTemp}º</span>
          </li>
          <li>
            <strong>Gravity: </strong>{" "}
            <span className="text-primary-2">{planet.gravity}</span>
          </li>
          <li>
            <strong>Mass: </strong>{" "}
            <span className="text-primary-2">{planet.mass?.massValue}</span>
          </li>
          <li>
            <strong>Axial tilt: </strong>{" "}
            <span className="text-primary-2">{planet.axialTilt}º</span>
          </li>
          <li>
            <strong>Density: </strong>{" "}
            <span className="text-primary-2">{planet.density}</span>
          </li>
          <li>
            <strong>Radius: </strong>{" "}
            <span className="text-primary-2">{planet.equaRadius}</span>
          </li>
        </ul>
        {planet.moons?.length && (
          <>
            <hr className="border-primary-1/10 my-5" />
            <h2 className="text-lg font-bold text-secondary-6">
              Moons ({planet.moons.length})
            </h2>
            <ul className="max-h-[500px] overflow-y-auto mt-5">
              {planet.moons.map(({ moon }) => (
                <li key={moon}>
                  <strong className="text-primary-2">{moon}</strong>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    )
  );
};

export default InformationCard;
