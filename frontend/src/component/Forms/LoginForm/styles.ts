import styled from "styled-components";
export { Input } from "../Input";
export { User as UserIcon, Lock as LockIcon } from "@styled-icons/fa-solid";
export { LogIn as LogInIcon } from "@styled-icons/feather";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  form {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    > button {
      align-self: flex-end;
      margin: 1rem 0;
    }
    > div {
      margin: 1rem 0;
    }
  }
`;
