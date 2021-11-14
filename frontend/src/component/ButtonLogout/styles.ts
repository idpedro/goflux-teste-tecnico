import styled from "styled-components";

export const Container = styled.div``;

interface IButton {
  color: string;
}
export const Button = styled.button<IButton>`
  color: ${(props) => props.color};
  transition: filter 0.4s;
  margin: 0 1rem;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    filter: brightness(1.4);
    transform: scale(1.3);
  }
`;
