/* eslint-disable react/jsx-props-no-spreading */
import { t } from "i18next";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  StyledForm,
  StyledPinkInput,
} from "../../components/profile/forms/AuthForm";
import { useGetPlaceQuery } from "../../store/geoDB/geoDBApi";
import { RootState } from "../../store/store";

function PlaceSuggest() {
  const { geoDBSearchQuery } = useSelector(
    (state: RootState) => state.persist.geoDB,
  );
  const { register, control } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const namePrefix = useWatch({ control, name: "namePrefix" });

  useGetPlaceQuery(
    { namePrefix, offset: "0" },
    {
      skip: !(namePrefix && namePrefix.length > 2),
    },
  );

  return (
    <StyledForm method="post" noValidate>
      <StyledPinkInput
        type="text"
        placeholder={geoDBSearchQuery || "Where to go"}
        {...register("namePrefix", {
          required: {
            value: true,
            message: `Place: ${t("formValidation.required")}`,
          },
        })}
      />
    </StyledForm>
  );
}

export default PlaceSuggest;
