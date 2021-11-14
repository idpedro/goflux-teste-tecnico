import React from "react";
import { Settings } from "@styled-icons/fluentui-system-filled";
import { Notifications } from "@styled-icons/material-rounded";
import { Container, UserArea, Divider, ButtonGroup, Button } from "./styles";
import ButtonLogout from "../ButtonLogout";
import { useAuth } from "../../context/Auth";

const USER_TYPES = { customer: "Embarcador", provider: "Transportadora" };

const UserNav: React.FC = () => {
  const { user } = useAuth();
  return (
    <Container>
      <UserArea>
        <img src="/assets/customer.svg" alt="Ilustração de uma caixa" />
        {user && (
          <div>
            <h2>{user.name}</h2>
            <span>{USER_TYPES[user.type]}</span>
          </div>
        )}
      </UserArea>
      <Divider></Divider>
      <ButtonGroup>
        <Button color="#5D5FEF">
          <Settings width="2rem" />
        </Button>
        <Button color="#EA0029">
          <Notifications width="2rem" />
        </Button>
        <ButtonLogout />
      </ButtonGroup>
    </Container>
  );
};

export default UserNav;
