import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { StyledIcon } from "@styled-icons/styled-icon";

import { ButtonStyled, colorsNames } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement<StyledIcon>;
  color: colorsNames;
  title: string;
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
