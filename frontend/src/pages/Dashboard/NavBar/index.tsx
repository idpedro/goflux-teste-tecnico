import React from "react";
import RouterLink from "../../../component/RouterLink";

import { Container } from "./styles";

const NavBar: React.FC = () => {
  return (
    <Container>
      <nav>
        <h1>Geral</h1>
        <ul>
          <li>
            <RouterLink to="offers" activeClass="active">
              Ofertas
            </RouterLink>
          </li>
        </ul>
        <h1>Configurações</h1>
        <ul>
          <li>
            <RouterLink to="configs" activeClass="active">
              Usuário
            </RouterLink>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default NavBar;
