import React from "react";
import { Logo } from "../Logo";
import UserNav from "../UserNav";

import { Container } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Logo />
      <UserNav />
    </Container>
  );
};

export default Header;
