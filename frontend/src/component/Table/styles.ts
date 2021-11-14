import styled from "styled-components";

export const Table = styled.table`
  text-align: center;
  border-collapse: separate;
  border-spacing: 0.2rem 0.4rem;
`;

export const THead = styled.thead`
  background: var(--flux-purple-500);
  > tr {
    > th {
      padding: 1rem;
    }
  }
`;

export const Tbody = styled.tbody`
  > tr {
    border-spacing: 1rem;
    > td {
      &.link {
        display: flex;
        background: var(--flux-yellow);
        color: var(--flux-purple-900);
        filter: brightness(0.8);

        > a {
          color: inherit;
          width: 100%;
          height: 100%;
        }
        &.link:hover {
          filter: brightness(1.2);
        }
      }
      padding: 0.4rem 0.2rem;
      background: var();
    }
    &:nth-of-type(odd) {
      background: #27203f;
    }
  }
`;
