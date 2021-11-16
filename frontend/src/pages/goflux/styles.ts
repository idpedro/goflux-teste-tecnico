import styled from "styled-components";

export const Container = styled.div`
  max-width: 1144px;
  margin: 0 auto;
  padding: 2rem;
  > form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    > fieldset {
      &.flex {
        display: flex;
        justify-content: space-around;
        flex-direction: row !important;
      }
      flex-direction: column;
      border: none;
      height: 100%;
      padding: 2rem;
      > div {
        margin-top: 1rem;
      }
    }
  }
`;
