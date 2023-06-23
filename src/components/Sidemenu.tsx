import { FC } from "react";

interface Props {
  isOpened: boolean;
  close: () => void;
}

const Sidemenu: FC<Props> = ({ isOpened, close }) => {
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
        Sidemenu
      </nav>
    </>
  );
};

export default Sidemenu;
