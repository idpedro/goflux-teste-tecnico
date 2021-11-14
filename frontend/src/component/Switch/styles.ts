import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  > span {
    display: flex;
    align-items: center;
    font-weight: 700;
  }
  margin: 1rem;
`;

export const Input = styled.input`
  display: block;
  width: 4rem;
  height: 2rem;
  margin: 1rem;
  position: relative;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  border: 0;
  outline: 0;
  &:checked {
    animation-play-state: running;
    animation-fill-mode: forwards;
  }
  ::after {
    content: " ";
    background: var(--flux-red-600);
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    box-shadow: 0 0 5px black, inset 0 0 5px black;
    transition: color 0.8s ease-in-out;
  }
  ::before {
    content: " ";
    background: var(--flux-red-500);
    position: absolute;
    width: 2.1rem;
    height: 2.1rem;
    transition: transform 0.2s ease-in-out, color 0.4s ease-in-out;
    z-index: 3;
    left: 0;
    border-radius: 100%;
    box-shadow: 0 0 5px inherit;
  }
  :checked {
    ::before {
      transform: translateX(100%);
      background: var(--flux-red-600);
    }
    ::after {
      background: var(--flux-red-500);
      box-shadow: none;
    }
  }
`;
