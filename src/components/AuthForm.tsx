/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StyledRedOutlineButton } from "../styledComponents/StyledButton";
import { flexboxLineStyle } from "../styledComponents/SharedStyles";

export const StyledForm = styled(Form)`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 15%;
  min-width: 300px;
`;

export const StyledInput = styled("input")`
  padding: 0.5rem;
  color: black;
  border: none;
  outline: none;
  text-align: center;
`;

export const StyledPinkInput = styled(StyledInput)`
  background-color: #fcdffd;
`;

export const StyledButtonList = styled("div")`
  ${flexboxLineStyle}
  gap: 1rem;
  * {
    width: 50%;
  }
`;

export function AuthForm({ type }: { type: string }) {
  const navigate = useNavigate();
  const { register } = useForm();
  const { t } = useTranslation();

  return (
    <StyledForm method="post">
      <StyledPinkInput
        type="email"
        placeholder="email"
        defaultValue=""
        {...register("email", {
          required: {
            value: true,
            message: t("formValidation.required"),
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: t("formValidation.email"),
          },
        })}
      />
      <StyledPinkInput
        type="password"
        placeholder="password"
        defaultValue=""
        {...register("password", {
          required: {
            value: true,
            message: t("formValidation.required"),
          },
          minLength: {
            value: 5,
            message: t("formValidation.short"),
          },
        })}
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
