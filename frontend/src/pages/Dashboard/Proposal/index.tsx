import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProposalProvider } from "../../../context/Proposal";
import { GetByOffer } from "./GetByOffer/indext";
import { List } from "./List";

const ProposalRoutes = () => {
  return (
    <ProposalProvider>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="offer/:id" element={<GetByOffer />} />
      </Routes>
    </ProposalProvider>
  );
};

export { ProposalRoutes };
