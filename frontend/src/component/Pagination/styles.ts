import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  > div {
    &:first-child {
      margin-right: 1rem;
    }
    > span {
      font-weight: 700;
      margin: 0 0.5rem;
    }
    > strong {
      margin: 0 0.5rem;
    }
  }
`;

export const Dots = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: var(--flux-purple-500);
  align-self: center;
  border-radius: 1000px;
  margin: 0 0.5rem;
`;
export const PageCount = styled.div``;
