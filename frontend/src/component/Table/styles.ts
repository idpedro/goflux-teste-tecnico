import styled from "styled-components";
import { darken } from "polished";
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
      &.action {
        background: none !important;
      }
      &.link {
        display: flex;
        background: var(--flux-yellow) !important;
        color: var(--flux-purple-900) !important;
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
    }

    &:nth-of-type(even) {
      > td {
        background: #27203f;
      }
    }
    &:nth-of-type(odd) {
      > td {
        background: ${darken(0.025, "#27203f")};
      }
    }
  }
`;

export type colorsNames = "red" | "green" | "blue" | "purple" | "yellow";
export const ActionButton = styled.button<{ color: colorsNames }>`
  padding: 0.1rem;
  border: none;
  font-size: 1.4rem;
  width: 100%;
  border-radius: 0.2rem;
  color: ${(props) => `var(--button-text-${props.color})`};
  background-color: ${(props) => `var(--button-${props.color})`};
  > svg {
    width: 1em;
  }
`;
