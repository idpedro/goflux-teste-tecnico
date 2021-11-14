import React from "react";
import { Routes, Route } from "react-router-dom";
import { OfferList } from "../List";
import AddOffer from "../AddOffer";
import Edit from "../Edit";

const OfferRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<OfferList />} />
      <Route path="/add" element={<AddOffer />} />
      <Route path="/:id" element={<Edit />} />
    </Routes>
  );
};

export { OfferRoutes };
