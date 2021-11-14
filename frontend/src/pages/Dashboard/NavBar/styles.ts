import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: auto;
  > nav {
    ul {
      list-style: none;
      margin: 0.4rem;
      > li > a {
        text-decoration: none;
        color: #fff;
        &.active {
          color: var(--flux-red-500) !important;
        }
        &:active,
        &:visited {
          color: inherit;
        }
      }
    }
  }
`;
