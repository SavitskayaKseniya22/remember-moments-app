/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage } from "@hookform/error-message";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { transparentStyle } from "../../styledComponents/SharedStyles";
import { StyledBasicButton } from "../../styledComponents/StyledButton";
import { StyledInput } from "../AuthForm";

export const StyledTransparentInput = styled(StyledInput)`
  ${transparentStyle}
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const StyledTransparentButton = styled(StyledBasicButton)`
  ${transparentStyle}
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
          type="button"
          handleClick={() => {
            setIsEditing(true);
          }}
        >
          {`${geo?.name}, ${geo?.state !== geo?.name ? `${geo?.state},` : ""} ${
            geo?.country
          }`}
        </StyledTransparentButton>
      )}
      <ErrorMessage errors={errors} name="cityName" />
    </Form>
  );
}

export default WeatherSearch;