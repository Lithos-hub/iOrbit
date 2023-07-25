import { FC } from "react";
import { Icon } from ".";
import { useAppDispatch } from "@/hooks/useRedux";
import { toggleTutorial } from "@/redux/slices/uiSlice";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  footer: React.ReactNode;
  title: string;
}

const Dialog: FC<Props> = ({ footer, title, ...rest }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full overflow-hidden backdrop-blur z-40"
        onClick={() => dispatch(toggleTutorial())}
      />
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${rest.className}`}
      >
        <header className="bg-secondary-1 p-5 text-primary-1 text-2xl flex justify-between items-center">
          <h2>{title}</h2>
          <Icon
            name="close"
            className="text-white h-7 w-7"
            onClick={() => dispatch(toggleTutorial())}
          />
        </header>
        <main className="bg-white p-5 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
          {rest.children}
        </main>
        <div className="bg-secondary-1 p-5 flex justify-end gap-5">
          {footer}
        </div>
      </div>
    </>
  );
};

export default Dialog;
