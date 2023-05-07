import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <StyledBlock>
      <StyledInput type="email" placeholder="email" />
      <StyledInput type="password" placeholder="password" />
      <StyledButtonList>
        <StyledRedOutlineButton
          type="submit"
          handleClick={() => {
            navigate("/board");
          }}
        >
          Enter
        </StyledRedOutlineButton>
        {type === "login" && (
          <StyledRedOutlineButton
            handleClick={() => {
              navigate("/auth/registration");
            }}
          >
            Registration
          </StyledRedOutlineButton>
        )}
        {type === "reg" && (
          <StyledRedOutlineButton
            handleClick={() => {
              navigate("/auth/login");
            }}
          >
            Login
          </StyledRedOutlineButton>
        )}
      </StyledButtonList>
    </StyledBlock>
  );
}

export default AuthForm;
