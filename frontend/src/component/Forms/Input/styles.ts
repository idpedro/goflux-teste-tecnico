import styled from "styled-components";
import { StyledIconBase } from "@styled-icons/styled-icon";

interface InputProps {
  iconOnRight?: boolean;
}

export const Container = styled.div<InputProps>`
  display: flex;
  justify-content: center;
  align-items: stretch;

  ${(props) => (props.iconOnRight ? "flex-direction: row-reverse" : "")}

  > label {
    display: flex;
    align-items: center;
    padding: 0.4rem;
    background: var(--flux-red-600);
    width: fit-content;
    ${StyledIconBase} {
      width: 1em;
      height: auto;
    }
  }
  > input {
    padding: 0.5em;
    font-size: 1em;
    flex: 2;
    width: 100%;
    border: none;
  }
`;
export const IconWrapper = styled.i`
  padding: 0.4rem;
  & + span {
    margin-left: 0.2rem;
  }
  min-width: 1em;
  width: auto;
  ${StyledIconBase} {
    width: 100%;
    height: auto;
  }
`;
