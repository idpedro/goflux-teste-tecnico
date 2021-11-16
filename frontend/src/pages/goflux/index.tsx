import React, { useCallback } from "react";
import Button from "../../component/Button";
import { Input } from "../../component/Forms/Input";
import Select from "../../component/Select";
import Switch from "../../component/Switch";
import { FormContextProvider } from "../../context/FormContext";
import { Save as SaveIcon } from "@styled-icons/boxicons-regular/Save";

import { Container } from "./styles";
import { Api } from "../../services/Api";
import { toast } from "react-toastify";
import { showErrors } from "../../helpers/GetErros";
import axios from "axios";

const GoFlux: React.FC = () => {
  const handlerCreate = useCallback((data) => {
    Api.post("/user", data)
      .then((response) => {
        console.log(response.data);
        toast.success("Usuario criado");
      })
      .catch((error) => {
        if (axios.isAxiosError(error))
          return showErrors(error.response?.data.errors);
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <h1>Cadastro de usuarios</h1>
      <FormContextProvider onSubmit={handlerCreate}>
        <fieldset>
          <Input name="name" title="Nome" type="text" />
          <Input name="doc" title="CNPJ" type="text" />
          <Input name="about" title="Sobre" type="text" />
          <Input name="site" title="Site" type="text" />
        </fieldset>
        <fieldset>
          <Input name="email" title="Email" type="email" required />
          <Input name="password" title="senha" type="password" required />
        </fieldset>
        <fieldset className="flex">
          <Select name="type" title="Tipo de usuário">
            <option value="customer">Embarcador</option>
            <option value="provider">Transportadora</option>
          </Select>
          <Switch name={"active"} text="Ativo ?" />
        </fieldset>
        <Button
          title="Salvar"
          type="submit"
          color="green"
          icon={<SaveIcon />}
        />
      </FormContextProvider>
    </Container>
  );
};

export default GoFlux;
