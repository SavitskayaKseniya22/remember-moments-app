/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import { Id, toast } from "react-toastify";
import { StyledRedOutlineButton } from "../styledComponents/StyledButton";
import { flexboxLineStyle } from "../styledComponents/SharedStyles";
import { formatDataToSend } from "../utils";
import { useSignInMutation, useSignUpMutation } from "../store/auth/authApi";

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

export function AuthForm({ formType }: { formType: string }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });
  const { t } = useTranslation();

  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const emailToastId = React.useRef<null | Id>(null);
  const passwordToastId = React.useRef<null | Id>(null);

  useEffect(() => {
    if (emailToastId.current) {
      toast.dismiss(emailToastId.current as Id);
    }
    if (errors.email) {
      emailToastId.current = toast.warn(
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}
        />,
        {
          autoClose: false,
        },
      );
    }
  }, [errors.email]);

  useEffect(() => {
    if (passwordToastId.current) {
      toast.dismiss(passwordToastId.current as Id);
    }

    if (errors.password) {
      passwordToastId.current = toast.warn(
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p>{message}</p>}
        />,
        {
          autoClose: false,
        },
      );
    }
  }, [errors.password]);

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const dataToSend = formatDataToSend(formData);
    if (formType === "login") {
      signIn(dataToSend);
    } else if (formType === "registration") {
      signUp(dataToSend)
        .unwrap()
        .then(() => {
          signIn(dataToSend);
        })
        .catch((rejected) => {
          console.error(rejected);
        });
    }
  };

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledPinkInput
        type="email"
        placeholder="email"
        defaultValue=""
        {...register("email", {
          required: {
            value: true,
            message: `Email: ${t("formValidation.required")}`,
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: `Email: ${t("formValidation.email")}`,
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
            message: `Password: ${t("formValidation.required")}`,
          },
          minLength: {
            value: 5,
            message: `Password: ${t("formValidation.short")}`,
          },
        })}
      />
      <StyledButtonList>
        <StyledRedOutlineButton type="submit">Enter</StyledRedOutlineButton>
        {formType === "login" && (
          <StyledRedOutlineButton
            handleClick={() => {
              navigate("/auth/registration");
            }}
          >
            Registration
          </StyledRedOutlineButton>
        )}
        {formType === "registration" && (
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
