import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const OffertInfo = styled.div`
  > h3 {
    border-bottom: 0.2rem solid var(--flux-purple-800);
    margin-bottom: 0.2rem;
  }
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      & + li {
        margin-left: 0.6rem;
      }
      > strong {
        margin-left: 0.4rem;
      }
    }
  }
`;
