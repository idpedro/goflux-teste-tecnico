import LoginForm from "../../component/Forms/LoginForm";
import { Figure } from "../../component/Figure";
import { Container } from "./styles";

const LoginPage = () => {
  return (
    <Container>
      <LoginForm />
      <Figure
        src="/assets/delivery_ilustration.svg"
        title="Ilustação de um entragador em uma van disponivel em storyset by freepik "
      />
    </Container>
  );
};

export { LoginPage };
