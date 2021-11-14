import { AddCircle } from "@styled-icons/fluentui-system-regular/AddCircle";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../../component/Button";
import { useAuth } from "../../../../../context/Auth";

import { Container } from "./styles";

const Header: React.FC = () => {
  const { user } = useAuth();
  const goTo = useNavigate();

  const hadlerAddOffer = () => {
    goTo("add");
  };
  return (
    <Container>
      <h1>Ofertas</h1>
      {user?.type === "customer" && (
        <div>
          <Button
            title="Adicionar"
            color="green"
            icon={<AddCircle />}
            onClick={hadlerAddOffer}
          />
        </div>
      )}
    </Container>
  );
};

export default Header;
