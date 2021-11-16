import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/Auth";
import GoFlux from "../pages/goflux";
import { LoginPage } from "../pages/Login";
import { PrivateRoute } from "./Private";

export function Router() {
  const { isAuth } = useAuth();
  console.log(isAuth);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={<Navigate replace to={isAuth ? "/dashboard" : "/login"} />}
        />
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="goflux" element={<GoFlux />}></Route>

        <Route path="dashboard/*" element={<PrivateRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
