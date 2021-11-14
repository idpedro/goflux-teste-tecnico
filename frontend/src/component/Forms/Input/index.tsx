import { InputHTMLAttributes, ReactElement, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { StyledIcon } from "@styled-icons/styled-icon";

import { useForm } from "../../../context/FormContext";
import { Container, IconWrapper } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  name: string;
  icon?: ReactElement<StyledIcon>;
  iconRight?: true;
}

const Input = ({
  title,
  name,
  icon,
  iconRight,
  placeholder,
  ...rest
}: InputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const id = uuid();
  const { register } = useForm();
  useEffect(() => {
    register(name, ref);
  }, [name, register]);
  return (
    <Container iconOnRight={iconRight}>
      <label htmlFor={id}>
        {title && !icon && <span>{title}</span>}
        {icon !== undefined && <IconWrapper>{icon}</IconWrapper>}
      </label>
      <input
        id={id}
        name={name}
        {...rest}
        ref={ref}
        placeholder={placeholder}
      />
    </Container>
  );
};

export { Input };
