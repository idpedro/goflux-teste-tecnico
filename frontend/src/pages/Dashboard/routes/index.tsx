import React from "react";
import { Routes, Route } from "react-router-dom";

import { Offer } from "../Offer";
import { ProposalRoutes } from "../Proposal";

const DashboardRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="configs" element={<h1>dale</h1>} />
      <Route path="proposals/*" element={<ProposalRoutes />} />
      <Route path="offers/*" element={<Offer />} />
    </Routes>
  );
};

export { DashboardRoutes };
