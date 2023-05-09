/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { StyledRedOutlineButton } from "../styledComponents/StyledButton";

export const StyledForm = styled(Form)`
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
  const { register } = useForm();

  return (
    <StyledForm method="post">
      <StyledInput
        type="email"
        placeholder="email"
        defaultValue=""
        {...register("email")}
      />
      <StyledInput
        type="password"
        placeholder="password"
        defaultValue=""
        {...register("password")}
      />
      <StyledButtonList>
        <StyledRedOutlineButton type="submit">Enter</StyledRedOutlineButton>
        {type === "login" && (
          <StyledRedOutlineButton
            handleClick={() => {
              navigate("/auth/registration");
            }}
          >
            Registration
          </StyledRedOutlineButton>
        )}
        {type === "registration" && (
          <StyledRedOutlineButton
            handleClick={() => {
              navigate("/auth/login");
            }}
          >
            Login
          </StyledRedOutlineButton>
        )}
      </StyledButtonList>
    </StyledForm>
  );
}

export default AuthForm;
