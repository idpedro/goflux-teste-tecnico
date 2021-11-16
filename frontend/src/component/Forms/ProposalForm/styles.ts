import styled from "styled-components";
export { Save as SaveIcon } from "@styled-icons/boxicons-regular/Save";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: var(--flux-purple-800);
  padding: 1rem;
  > h1 {
    margin: 1rem 0;
  }
  > form {
    display: flex;
    flex-direction: column;
  }
`;

export const InputArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
  > div {
    flex: 1;
    & + div {
      margin-left: 1rem;
    }
  }
`;

export const OfferInfoArea = styled.section`
  > h3 {
    margin: 0.5rem 0;
    text-transform: capitalize;
  }
  > ul {
    display: flex;
    list-style: none;
    justify-content: space-around;

    > li {
      background: var(--flux-green-500);
      display: flex;
      padding: 0 1rem;
      > strong {
        margin-left: 0.4rem;
        > span {
          padding: 0 0.2rem;
        }
      }
      & + li {
        padding-left: 0.2rem;
      }
    }
  }
`;

export const ButtonArea = styled.div`
  display: flex;
  width: fit-content;
  margin-top: 1.2rem;
  > button + button {
    margin-left: 2rem;
  }
  align-self: flex-end;
`;
