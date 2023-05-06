import React from "react";
import styled from "styled-components";
import { StyledRedOutlineButton } from "../styledComponents/StyledButton";

export const StyledBlock = styled("div")`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 15%;
`;

export const StyledInput = styled("input")`
  background-color: #fcdffd;
  padding: 0.5rem;
  color: black;
  border: none;
  outline: none;
  text-align: center;
`;

export const StyledButtonList = styled("div")`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  * {
    width: 50%;
  }
`;

export function AuthForm({ type }: { type: string }) {
  return (
    <StyledBlock>
      <StyledInput type="email" placeholder="email" />
      <StyledInput type="password" placeholder="password" />
      {type === "reg" ? <StyledInput type="text" placeholder="name" /> : ""}
      <StyledButtonList>
        <StyledRedOutlineButton type="submit" path="board">
          Enter
        </StyledRedOutlineButton>
        {type === "login" ? (
          <StyledRedOutlineButton type="button" path="registration">
            Registration
          </StyledRedOutlineButton>
        ) : (
          ""
        )}
        {type === "reg" ? (
          <StyledRedOutlineButton type="button" path="login">
            Login
          </StyledRedOutlineButton>
        ) : (
          ""
        )}
      </StyledButtonList>
    </StyledBlock>
  );
}

export default AuthForm;
