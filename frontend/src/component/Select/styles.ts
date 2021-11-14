import styled from "styled-components";

export const SelectElement = styled.select`
  border: none;
  padding: 0.5rem 0;
  background: var(--flux-red-500);
  color: #fff;
  font-weight: bold;
  font-family: var(--font-text);
  font-size: 1rem;
`;

export const Container = styled.div`
  background: var(--flux-red-500);
  padding: 0.5rem 1rem;
  > label {
    margin-right: 1rem;
  }
`;
