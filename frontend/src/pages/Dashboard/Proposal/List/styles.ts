import { darken } from "polished";
import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--flux-purple-800);
  padding: 2rem 1.5rem;
  box-shadow: inset 0 0 0.1rem ${darken(0.1, "#241c36")};
  > h1 {
    font-size: 1.5rem;
  }
`;

export const OffertInfo = styled.div`
  background: var(--flux-purple-800);
  margin-bottom: 1rem;
  > h3 {
    margin-bottom: 0.2rem;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      & + li {
        margin-left: 0.6rem;
        border-left: 0.2rem solid var(--flux-green-500);
        padding-left: 0.6rem;
      }
      > strong {
        margin-left: 0.4rem;
      }
    }
  }
`;

export const Select = styled.select``;

export const SelectArea = styled.div`
  display: flex;
  background: var(--button-yellow);
  color: var(--button-text-yellow);
  font-family: var(--font-text);
  align-items: center;
  width: fit-content;
  > label {
    padding: 0 0.5rem;
  }
  > select {
    display: block;
    align-self: flex-end;
    border: none;
    font-weight: bold;
    background: var(--flux-yellow);
    padding: 1rem;
    &::selection {
      outline: none;
    }
  }
`;

export const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding: 0 0.2rem;
`;
