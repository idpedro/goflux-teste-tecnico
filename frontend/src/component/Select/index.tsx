import React, { SelectHTMLAttributes, useEffect, useRef } from "react";
import { useForm } from "../../context/FormContext";

import { SelectElement, Container } from "./styles";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  name: string;
  title?: string;
}

const Select = ({ name, title, children, ...rest }: SelectProps) => {
  const ref = useRef<HTMLSelectElement>(null);
  const { register } = useForm();
  useEffect(() => {
    register(name, ref);
  }, [name, register]);
  return (
    <Container>
      {title && <label>{title}</label>}
      <SelectElement name={name} {...rest} ref={ref}>
        {children}
      </SelectElement>
    </Container>
  );
};

export default Select;
