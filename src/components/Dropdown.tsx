import { FC, useState } from "react";
import { Icon } from "@/components";

type Option = {
  value: string;
  label: string;
};

interface Props {
  options: Option[];
  selection: string;
  onSelect: (value: string) => void;
}

const Dropdown: FC<Props> = ({ options, onSelect, selection }) => {
  const [isSelecting, setIsSelecting] = useState(false);
  return (
    <>
      {isSelecting && (
        <div
          className="fixed top-0 left-0 w-screen h-screen"
          onClick={() => setIsSelecting(false)}
        />
      )}
      <div className="relative">
        <div
          onClick={() => setIsSelecting(true)}
          className={`p-2.5 min-h-[46px] border cursor-pointer hover:bg-[#101010] duration-200 ${
            isSelecting ? "border-primary-1" : "border-primary-1/10"
          }  bg-black w-full focus:outline-none capitalize`}
          onChange={() => {}} // => to prevent React warning
        >
          <small>{selection || "Click to select"}</small>
        </div>
        <Icon
          name="chevron"
          className={`h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-primary-1 ${
            isSelecting && "rotate-180"
          } duration-200`}
        />
        {isSelecting && options && (
          <ul className="bg-black border border-primary-1/50 w-full absolute top-[46px] left-0">
            {options.map(({ label }, index) => (
              <li
                key={index}
                className="p-2.5 hover:bg-primary-2/10 hover:text-primary-1 text-sm cursor-pointer"
                onClick={() => {
                  onSelect(label);
                  setIsSelecting(false);
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
