import styled from "styled-components";
import { shade } from "polished";

export const Wrapper = styled.div`
  position: absolute;
  z-index: 999;
  background: ${(props) => props.theme.colors.app.menuBg};
  box-shadow: 0 0 10px 0 ${(props) => shade(0.6, props.theme.colors.app.menuBg)};
  width: 80%;
  min-width: 40vw;
  min-height: 40vh;
  top: 15vh;
  left: 15vw;
`;

export const Controller = styled.div`
  width: 100%;
  height: 2.5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${(props) => shade(0.3, props.theme.colors.app.menuBg)};
  margin-bottom: 1em;
  > button {
    background: ${(props) => props.theme.colors.log.danger};
    width: 2em;
    height: 2em;
    margin-right: 0.5em;
    border: none;
    color: ${(props) => props.theme.colors.app.text};
    box-shadow: inset 0 0 0.5em 0
      ${(props) => shade(0.6, props.theme.colors.log.danger)};
  }
  > button:hover {
    opacity: 0.6;
    box-shadow: inset 0 0 0.5em 0
        ${(props) => shade(0.6, props.theme.colors.log.danger)},
      0 0 0.5em 0 ${(props) => shade(0.6, props.theme.colors.log.danger)};
  }
`;
