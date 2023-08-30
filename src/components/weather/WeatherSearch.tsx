/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from "@hookform/error-message";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { RootState } from "../../store/store";
import { StyledInput } from "../profile/forms/AuthForm";
import { StyledBasicButton } from "../../styledComponents/SharedStyles";

export const StyledTransparentInput = styled(StyledInput)`
  background-color: transparent;
  color: rgb(252, 223, 253);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const StyledTransparentButton = styled(StyledBasicButton)`
  background-color: transparent;
  color: rgb(252, 223, 253);
  border-bottom: 1px solid rgba(0, 0, 0, 0);
`;

function WeatherSearch({
  setCityTitle,
  setIsSubmitSuccessful,
}: {
  setCityTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsSubmitSuccessful: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitSuccessful },
    clearErrors,
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const { geo } = useSelector((state: RootState) => state.persist.weather);

  const onSubmit = handleSubmit(async ({ cityName }) => {
    setCityTitle(cityName);
  });

  useEffect(() => {
    setIsSubmitSuccessful(isSubmitSuccessful);
    reset({ keepValues: true });
  }, [isSubmitSuccessful, reset, setIsSubmitSuccessful]);

  useEffect(() => {
    setIsEditing(false);
  }, [geo]);

  useEffect(() => {
    if (isEditing) {
      setFocus("cityName");
    }
  }, [isEditing, setFocus]);

  useEffect(() => {
    if (errors.cityName) {
      toast.warn(
        <ErrorMessage
          errors={errors}
          name="cityName"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />,
        {
          autoClose: false,
          toastId: JSON.stringify(errors.cityName.types),
        },
      );
    }
  }, [errors, errors.cityName]);

  return (
    <Form method="get" onSubmit={onSubmit}>
      {isEditing || !geo ? (
        <StyledTransparentInput
          type="text"
          placeholder="city"
          defaultValue={
            (geo?.local_names && geo?.local_names[i18n.language]) || geo?.name
          }
          {...register("cityName", {
            required: {
              value: true,
              message: t("formValidation.required"),
            },
            pattern: {
              value: /^[A-Za-zА-Яа-я]+$/,
              message: t("formValidation.onlyLetters"),
            },
            minLength: {
              value: 3,
              message: t("formValidation.short"),
            },
          })}
          onBlur={() => {
            setIsEditing(false);
            clearErrors();
          }}
        />
      ) : (
        <StyledTransparentButton
          $view="outline"
          type="button"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {`${geo?.name}, ${
            geo?.state && geo?.state !== geo?.name ? `${geo?.state},` : ""
          } ${geo?.country}`}
        </StyledTransparentButton>
      )}
    </Form>
  );
}

export default WeatherSearch;
