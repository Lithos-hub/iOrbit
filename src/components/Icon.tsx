import { FC, useMemo } from "react";
import icons from "@/assets/icons.svg";

interface Props {
  name: string;
  className?: string;
  onClick?: () => void;
}

const Icon: FC<Props> = ({ name, className, onClick }) => {
  const color = useMemo(() => {
    if (className?.includes("dark:text-")) return "currentColor";
    return undefined;
  }, [className]);
  return (
    <svg
      className={`${onClick && "cursor-pointer"} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      onClick={onClick}
    >
      <use
        id={name}
        xlinkHref={`${icons}#${name}`}
        fill={color}
        width="100%"
        height="100%"
      />
    </svg>
  );
};

export default Icon;
