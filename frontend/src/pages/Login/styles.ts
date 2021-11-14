import styled from "styled-components";
import { Figure } from "../../component/Figure";

export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1144px;
  margin: 0 auto;
  flex-wrap: wrap;
  > div {
    flex: 1;
  }
  > figure {
    flex: 1;
  }
  > ${Figure.name} {
    flex-shrink: 1;
    max-width: 500px;
    min-width: min(20vw, 75px);
  }
`;
