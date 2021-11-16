import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/Auth";

import { Offer } from "../Offer";
import { ProposalRoutes } from "../Proposal";

const DashboardRoutes: React.FC = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Navigate
            replace
            to={user?.type === "customer" ? "offers/" : "proposals/"}
          />
        }
      />
      <Route path="proposals/*" element={<ProposalRoutes />} />
      <Route path="offers/*" element={<Offer />} />
    </Routes>
  );
};

export { DashboardRoutes };
