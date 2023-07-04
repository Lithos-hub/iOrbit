import { useAppSelector } from "@/hooks/useRedux";
import { FC } from "react";

interface Props {
  image: string;
  text: string;
  onSelect: () => void;
  scale: "real" | "same";
}

const ScaleSelector: FC<Props> = ({ image, text, onSelect, scale }) => {
  const selectedScale = useAppSelector((state) => state.planet.selectedScale);
  return (
    <div
      className={`${
        selectedScale !== scale && "hover:opacity-50"
      } cursor-pointer duration-200`}
      onClick={onSelect}
    >
      <img
        src={image}
        className={`w-[95%] h-auto border mx-auto ${
          selectedScale === scale ? "border-primary-1" : "border-primary-1/10"
        }`}
      />
      <small>{text}</small>
    </div>
  );
};

export default ScaleSelector;
