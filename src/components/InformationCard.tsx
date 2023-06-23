import { Body } from "@/models";
import { FC } from "react";

interface Props {
  planet: Body;
}

const InformationCard: FC<Props> = ({ planet }) => {
  return (
    <div className="fixed top-20 right-10 z-50 p-4 text-primary-1 backdrop-blur border border-primary-1/10">
      <h1>{planet.name}</h1>
    </div>
  );
};

export default InformationCard;
