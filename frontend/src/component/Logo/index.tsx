import GoFluxLogo from "./assets/logo.svg";
import { Container, Img } from "./styles";

const Logo = () => {
  return (
    <Container>
      <Img src={GoFluxLogo} alt="Go Flux" />
    </Container>
  );
};

export { Logo };
