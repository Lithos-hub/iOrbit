import { FC } from "react";

import Icon from "./Icon";

interface Props {
  open: () => void;
}

const Navbar: FC<Props> = () => {
  return (
    <nav className="fixed top-0 left-0 w-full text-white backdrop-blur z-50 flex justify-between items-center p-4 border-b border-b-primary-1/10">
      {/* <Icon name="menu" className="h-6 w-6" onClick={open} /> */}
      <img src="/img/logo.png" className="h-6 w-6" />

      {/* <h1 className="font-extralight">iOrbit</h1> */}

      <a href="https://github.com/Lithos-hub/iOrbit" target="_blank">
        <Icon name="github" className="h-6 w-6" />
      </a>
    </nav>
  );
};

export default Navbar;
