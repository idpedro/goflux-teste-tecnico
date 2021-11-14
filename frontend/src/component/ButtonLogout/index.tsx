import { Logout } from "@styled-icons/material-rounded/Logout";
import React, { useCallback } from "react";
import { useAuth } from "../../context/Auth";

import { Button } from "./styles";

const ButtonLogout: React.FC = () => {
  const { logout } = useAuth();
  const handlerOnClick = useCallback(() => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  }, [logout]);
  return (
    <Button color="#ECAF4A" onClick={handlerOnClick}>
      <Logout width="2rem" />
    </Button>
  );
};

export default ButtonLogout;
