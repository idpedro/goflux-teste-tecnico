import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

import { useAuth } from "../../../context/Auth";

import { FormContextProvider } from "../../../context/FormContext";
import { Logo } from "../../Logo";
import Button from "../../Button";
import Switch from "../../Switch";

import { Container, LockIcon, LogInIcon, UserIcon, Input } from "./styles";
const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigateTo = useNavigate();

  const handlerSubmit = useCallback(
    async ({ email, password, keep }: any) => {
      const isLogged = await login({ email, password, keepOn: keep });
      if (isLogged) navigateTo("/dashboard");
    },
    [login, navigateTo]
  );
  return (
    <Container>
      <Logo />
      <FormContextProvider onSubmit={handlerSubmit}>
        <Input
          title="Email"
          name="email"
          icon={<UserIcon />}
          type={"email"}
          required
        />
        <Input
          title="Senha"
          name="password"
          type="password"
          icon={<LockIcon />}
          required
        />
        <Switch name="keep" />
        <Button title="Login" type="submit" color="red" icon={<LogInIcon />} />
      </FormContextProvider>
    </Container>
  );
};

export default LoginForm;
