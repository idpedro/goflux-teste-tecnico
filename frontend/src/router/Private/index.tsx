import { Dashboard } from "../../pages/Dashboard";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

export function PrivateRoute() {
  const { isAuth } = useAuth();
  return isAuth ? <Dashboard /> : <Navigate replace to="/login" />;
}
