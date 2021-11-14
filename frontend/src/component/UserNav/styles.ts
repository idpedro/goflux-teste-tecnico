import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Divider = styled.div`
  width: 0.4rem;
  background: #34284b;
  margin: 0 0.4rem;
`;
export const UserArea = styled.div`
  display: flex;

  img {
    margin-right: 1rem;
    flex: 1;
    object-fit: contain;
  }
  & > div {
    display: flex;
    flex-direction: column;
    flex: 2;
    justify-content: center;
    padding: 0.4rem;
    text-transform: capitalize;
    > h2 {
      font-size: 1.3rem;
    }
    > span {
      font-size: 0.8rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

interface IButton {
  color: string;
}
export const Button = styled.button<IButton>`
  color: ${(props) => props.color};
  transition: filter 0.4s;
  & + & {
    margin-left: 1rem;
  }
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    filter: brightness(1.4);
  }
`;
