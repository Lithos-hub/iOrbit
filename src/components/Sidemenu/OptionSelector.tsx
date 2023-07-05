import { useAppSelector } from "@/hooks/useRedux";
import { FC, useMemo } from "react";

interface Props {
  image: string;
  text: string;
  onSelect: () => void;
  value: string;
  type: "scale" | "orbit";
}

const ScaleSelector: FC<Props> = ({ image, text, onSelect, value, type }) => {
  const selectedScale = useAppSelector((state) => state.planet.selectedScale);
  const selectedOrbit = useAppSelector((state) => state.planet.selectedOrbit);

  const isSelected = useMemo(() => {
    if (type === "scale") return selectedScale === value;
    if (type === "orbit") return selectedOrbit === value;
  }, [selectedScale, selectedOrbit]);

  return (
    <div
      className={`${
        !isSelected && "hover:opacity-50"
      } cursor-pointer duration-200`}
      onClick={onSelect}
    >
      <img
        src={image}
        className={`w-[95%] h-auto border-l border-b mx-auto ${
          isSelected ? "border-primary-1" : "border-primary-1/10"
        }`}
      />
      <small>{text}</small>
    </div>
  );
};

export default ScaleSelector;
