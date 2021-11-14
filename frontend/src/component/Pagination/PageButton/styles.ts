import styled from "styled-components";

export const Container = styled.div``;

interface ButtonProps {
  isActive?: boolean;
}
export const Button = styled.a<ButtonProps>`
  & + & {
    margin-left: 0.5rem;
  }
  background: ${(props) =>
    props.isActive ? "var(--flux-yellow)" : "var(--flux-purple-500)"};
  padding: 0.5rem;
`;
