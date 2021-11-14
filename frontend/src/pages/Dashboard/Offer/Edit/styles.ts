import styled from "styled-components";

export const Container = styled.div`
  background: var(--flux-purple-800);
  padding: 2rem;
  > h1 {
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
  > form {
    display: flex;
    flex-direction: column;
    > button {
      align-self: flex-end;
      margin: 1rem 0.5rem;
    }
  }
`;
