import { HTMLAttributes, FC, useMemo } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "success";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  effect?: "pulse";
}

const Button: FC<Props> = ({ variant, children, effect, ...rest }) => {
  const buttonEffect = useMemo(() => effect && `btn-${effect}`, [effect]);

  return (
    <button {...rest} className={`btn btn-${variant} ${buttonEffect}`}>
      {children}
    </button>
  );
};

export default Button;
