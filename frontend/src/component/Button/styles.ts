import styled from "styled-components";
export type colorsNames = "red" | "green" | "blue" | "purple" | "yellow";
interface ButtonStyledProps {
  color?: colorsNames;
}
export const ButtonStyled = styled.button<ButtonStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 1rem;
  font-weight: 900;
  color: ${(props) => `var(--button-text-${props.color})`};
  background-color: ${(props) => `var(--button-${props.color})`};
  font-family: var(--font-text);
  border: none;
  font-size: 1.2rem;
  margin: 1rem auto;

  > i {
    display: block;
    width: 1.5em;
    margin-left: 0.8rem;
  }
`;
