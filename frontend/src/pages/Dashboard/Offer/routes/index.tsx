import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { OfferList } from "../List";
import AddOffer from "../AddOffer";
import Edit from "../Edit";
import { useAuth } from "../../../../context/Auth";

const OfferRoutes: React.FC = () => {
  const { isAuth, user } = useAuth();
  if (isAuth)
    return (
      <Routes>
        <Route path="/" element={<OfferList />} />
        <Route
          path="/add"
          element={
            user?.type !== "provider" ? (
              <AddOffer />
            ) : (
              <Navigate replace to={"/"} />
            )
          }
        />
        <Route
          path="/:id"
          element={
            user?.type !== "provider" ? <Edit /> : <Navigate replace to={"/"} />
          }
        />
      </Routes>
    );
  return <Navigate replace to={"/"} />;
};

export { OfferRoutes };
