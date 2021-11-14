import React from "react";
import Header from "../../component/Navbar";
import { OfferProvider } from "../../context/Offer";
import NavBar from "./NavBar";
import { DashboardRoutes } from "./routes";

import { Container, Main } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header />
      <Main>
        <NavBar />
        <OfferProvider>
          <DashboardRoutes />
        </OfferProvider>
      </Main>
    </Container>
  );
};

export { Dashboard };
