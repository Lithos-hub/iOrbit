import { FC } from "react";

import Icon from "./Icon";
import { Button } from ".";
import { useAppDispatch } from "@/hooks/useRedux";
import { toggleTutorial } from "@/redux/slices/uiSlice";

interface Props {
  onOpenSidemenu: () => void;
}

const Navbar: FC<Props> = ({ onOpenSidemenu }) => {
  const dispatch = useAppDispatch();

  return (
    <nav className="fixed top-0 left-0 w-full text-white backdrop-blur z-40 flex justify-between items-center py-2 px-4 border-b border-b-primary-1/10">
      <Icon name="menu" className="h-6 w-6" onClick={onOpenSidemenu} />
      <img
        src="/img/logo.png"
        className="h-6 w-6 absolute left-1/2 -translate-x-1/2"
      />

      <div className="flex gap-5 items-center">
        <Button variant="primary" onClick={() => dispatch(toggleTutorial())}>
          Tutorial
        </Button>

        <a href="https://github.com/Lithos-hub/iOrbit" target="_blank">
          <Icon name="github" className="h-6 w-6" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
