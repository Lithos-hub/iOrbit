import { FC } from "react";

import { Body } from "@/models";

import { Icon } from "@/components";

import { motion } from "framer-motion";

interface Props {
  planet: Body;
  collapse: () => void;
}

const InformationCard: FC<Props> = ({ planet, collapse }) => {
  return (
    planet && (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="fixed top-20 right-10 z-50 p-4 text-primary-1 backdrop-blur border border-primary-1/10"
      >
        <div className="flex justify-between text-secondary-6">
          <h1 className="text-xl font-bold">{planet.englishName}</h1>
          <Icon name="collapse" className="h-8 w-8" onClick={collapse} />
        </div>
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
      </motion.div>
    )
  );
};

export default InformationCard;
