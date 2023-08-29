/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledForm, StyledPinkInput } from "../../../AuthForm";
import { RootState } from "../../../../store/store";
import {
  useGetUserDataMutation,
  useUpdateNameMutation,
} from "../../../../store/auth/authApi";
import Button from "../../../Button";

function NameUpdateForm() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData] = useGetUserDataMutation({
    fixedCacheKey: "shared-get-user-data",
  });
  const [updateName] = useUpdateNameMutation();
  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    if (activeUser) {
      const { idToken, profilePicture: photoUrl } = activeUser;
      updateName({
        idToken,
        displayName: formData.displayName,
        photoUrl,
      })
        .unwrap()
        .then(() => {
          getUserData(idToken);
          reset();
        })
        .catch((rejected) => {
          console.error(rejected);
        });
    }
  };

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledPinkInput
        type="text"
        placeholder={activeUser?.displayName || "Name"}
        {...register("displayName")}
      />

      <Button view="outline" type="submit">
        Update name
      </Button>
    </StyledForm>
  );
}

export default NameUpdateForm;
