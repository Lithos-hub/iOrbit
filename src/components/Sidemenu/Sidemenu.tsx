import { FC } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { selectScale } from "@/redux/slices/planetSlice";

import { ScaleSelector } from ".";

interface Props {
  isOpened: boolean;
  close: () => void;
}

const Sidemenu: FC<Props> = ({ isOpened, close }) => {
  const dispatch = useAppDispatch();

  const onSelectScale = (scale: string) => {
    dispatch(selectScale(scale));
    close();
  };
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
            <div className="flex gap-2.5 justify-between">
              <ScaleSelector
                image="/img/scale-real.jpg"
                text="Realistic"
                scale="real"
                onSelect={() => onSelectScale("real")}
              />
              <ScaleSelector
                image="/img/scale-same.jpg"
                text="Same size"
                scale="same"
                onSelect={() => onSelectScale("same")}
              />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidemenu;
