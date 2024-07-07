/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  StyledForm,
  StyledPinkInput,
} from "../../components/profile/forms/AuthForm";
import { StyledBasicButton } from "../../styledComponents/SharedStyles";
import { updateUserData } from "../../store/auth/authSlice";

export const StyledJourneyWidget = styled("div")``;

function JourneyWidget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const { date_to: dateTo, date_from: dateFrom, place } = formData;
    dispatch(
      updateUserData({
        id: `${new Date()}-${place}-${dateFrom}-${dateTo}`,
        date_to: dateTo,
        date_from: dateFrom,
        place,
        notes: [],
      }),
    );
    navigate("/board");
  };

  return (
    <StyledJourneyWidget>
      <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledPinkInput
          type="text"
          placeholder="Where to go"
          {...register("place", {
            required: {
              value: true,
              message: `Place: ${t("formValidation.required")}`,
            },
          })}
        />
        <input
          type="date"
          {...register("date_to", {
            required: {
              value: true,
              message: `End date: ${t("formValidation.required")}`,
            },
          })}
        />
        <input
          type="date"
          {...register("date_from", {
            required: {
              value: true,
              message: `Start date: ${t("formValidation.required")}`,
            },
          })}
        />

        <StyledBasicButton $view="full" type="submit">
          Go
        </StyledBasicButton>
      </StyledForm>
    </StyledJourneyWidget>
  );
}

export default JourneyWidget;
