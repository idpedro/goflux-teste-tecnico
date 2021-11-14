import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/Auth";
import { Router } from "./router/index";
import GlobalStyle from "./styles/global";
function App() {
  return (
    <AuthContextProvider>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Router />
    </AuthContextProvider>
  );
}

export default App;
