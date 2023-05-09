/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { StyledRedOutlineButton } from "../styledComponents/StyledButton";
import signUp, { signIn } from "../services/apiService";

export const StyledForm = styled("form")`
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
  const { register, handleSubmit } = useForm();
  const storage = window.localStorage;

  const onSubmit = handleSubmit(async (data) => {
    const dataToSend = {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    };
    if (type === "login") {
      signIn(dataToSend)
        .then((result) => {
          if (!result.error) {
            storage.setItem(
              "activeUser",
              JSON.stringify({
                email: result.email,
                token: result.idToken,
              }),
            );
            navigate("/board");
          }
        })

        .catch((error) => {
          console.error(`Download error: ${error}`);
        });
    } else if (type === "reg") {
      signUp(dataToSend)
        .then((result) => {
          if (!result.error) {
            signIn(dataToSend);
          }
          return result;
        })
        .then((result) => {
          if (!result.error) {
            storage.setItem(
              "activeUser",
              JSON.stringify({
                email: result.email,
                token: result.idToken,
              }),
            );
            navigate("/board");
          }
        })

        .catch((error) => {
          console.error(`Download error: ${error}`);
        });
    }
  });
  return (
    <StyledForm onSubmit={onSubmit}>
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
    </StyledForm>
  );
}

export default AuthForm;
