/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import { Id, toast } from "react-toastify";

import {
  StyledMainCentred,
  styledBlock,
  StyledBasicButton,
} from "../../../styledComponents/SharedStyles";
import {
  useSignInMutation,
  useSignUpMutation,
} from "../../../store/auth/authApi";
import { StyledNavLink } from "../../interface/Navigation";

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${styledBlock}
  padding:0.5rem;
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
  display: flex;
  align-items: center;
  gap: 1rem;
  & > * {
    width: 50%;
  }
`;

export function AuthForm({ formType }: { formType: string }) {
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
    const { email, password } = formData;
    if (formType === "login") {
      signIn({ email, password });
    } else if (formType === "registration") {
      signUp({ email, password })
        .unwrap()
        .then(() => {
          signIn({ email, password });
        })
        .catch((rejected) => {
          console.error(rejected);
        });
    }
  };

  return (
    <StyledMainCentred>
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
          <StyledBasicButton type="submit" $view="full">
            Enter
          </StyledBasicButton>
          {formType === "login" && (
            <StyledNavLink $view="outline" to="/auth/registration">
              Registration
            </StyledNavLink>
          )}
          {formType === "registration" && (
            <StyledNavLink $view="outline" to="/auth/login">
              Login
            </StyledNavLink>
          )}
        </StyledButtonList>
      </StyledForm>
    </StyledMainCentred>
  );
}

export default AuthForm;
