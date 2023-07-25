import { HTMLAttributes, FC } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
}

const Button: FC<Props> = ({ variant, children, ...rest }) => {
  return (
    <button {...rest} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
};

export default Button;
