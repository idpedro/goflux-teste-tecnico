import React from "react";
import RouterLink from "../../../component/RouterLink";
import { useAuth } from "../../../context/Auth";

import { Container } from "./styles";

const NavBar: React.FC = () => {
  const { user } = useAuth();
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
          {user?.type === "provider" && (
            <li>
              <RouterLink to="proposals" activeClass="active">
                Propostas
              </RouterLink>
            </li>
          )}
        </ul>
      </nav>
    </Container>
  );
};

export default NavBar;
