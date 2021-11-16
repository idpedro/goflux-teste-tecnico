import React, { ButtonHTMLAttributes } from "react";

import { ButtonStyled, colorsNames } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  color: colorsNames;
  title?: string;
}

const Button = ({ title, icon, color, ...rest }: ButtonProps) => {
  return (
    <>
      <ButtonStyled color={color ?? "blue"} {...rest}>
        {title && <span>{title}</span>}
        {icon !== undefined && <i>{icon}</i>}
      </ButtonStyled>
    </>
  );
};

export default Button;
