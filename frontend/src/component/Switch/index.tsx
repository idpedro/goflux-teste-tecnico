import React, { useEffect, useRef } from "react";
import { useForm } from "../../context/FormContext";

import { Container, Input } from "./styles";

interface SwitchProps {
  checked?: boolean;
  name: string;
}
const Switch = ({ checked = false, name }: SwitchProps) => {
  const { register } = useForm();

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(ref.current?.checked);
    register(name, ref);
  });

  return (
    <Container>
      <Input
        type="checkbox"
        defaultChecked={checked ? true : false}
        ref={ref}
      />
      <span>Manter Conectado ? </span>
    </Container>
  );
};

export default Switch;
