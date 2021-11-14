import { decode } from "jsonwebtoken";
import { toast } from "react-toastify";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Api } from "../../services/Api";

interface UserFormProps {
  email: string;
  password: string;
  keepOn: boolean;
}
type userProps = {
  id: number;
  name: string;
  type: "customer" | "provider";
};

interface AuthContextProps {
  user: userProps | null;
  isAuth: boolean;
  login: (user: UserFormProps) => Promise<boolean | undefined>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthResponseProps {
  token: string;
  user: userProps;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<userProps | null>(null);
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = decode(token);
      const { user } = payload as { user: userProps };
      setUser(user);
      return true;
    }
    return false;
  });

  const [keepTokenOnClose, setkeepTokenOnClose] = useState(() => {
    const keep = localStorage.getItem("keep");
    return keep && keep === "1" ? true : false;
  });

  useEffect(() => {
    const removeTokenOnClose = function () {
      localStorage.removeItem("token");
    };
    if (!keepTokenOnClose) {
      window.addEventListener("beforeunload", removeTokenOnClose);
    } else {
      window.removeEventListener("beforeunload", removeTokenOnClose);
    }
  }, [isAuth, keepTokenOnClose]);

  const login = async (userForm: UserFormProps) => {
    try {
      const { email, password, keepOn } = userForm;
      setkeepTokenOnClose((keep) => {
        localStorage.setItem("keep", keepOn ? "1" : "0");
        return keepOn;
      });
      if (email === "" || password === "") {
        toast.error("Usuário ou senha não podem ser vazios");
      }
      const response = await Api.post("/auth", userForm);
      const { token, user: userRequest } = response.data as AuthResponseProps;
      console.log(user);
      setUser(userRequest);
      saveToken(token);
      setIsAuth(true);
      return true;
    } catch (error: any) {
      if (error.response.status === 401)
        toast.warning("Usuário ou senha invalidos");
      else toast.error("Erro ao logar no sistema");
    }
  };

  const saveToken = (token: string) => {
    localStorage.setItem("token", token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };
  return (
    <AuthContext.Provider value={{ isAuth, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { isAuth, login, logout, user } = useContext(AuthContext);
  return { isAuth, login, logout, user };
};
