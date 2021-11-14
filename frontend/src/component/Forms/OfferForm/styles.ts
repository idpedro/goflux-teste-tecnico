import styled from "styled-components";
export { Save as SaveIcon } from "@styled-icons/boxicons-regular/Save";

export const Container = styled.div``;

export const InputArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-column: auto;
  }
`;

export const SelectArea = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  align-items: stretch;

  > input {
    width: 100%;
  }
`;
export const ButtonArea = styled.div`
  display: flex;
  width: fit-content;
  margin-top: 2rem;
  > button + button {
    margin-left: 2rem;
  }
  align-self: flex-end;
`;
