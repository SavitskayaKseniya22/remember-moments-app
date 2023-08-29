/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledForm, StyledPinkInput } from "../../../AuthForm";
import { RootState } from "../../../../store/store";
import {
  useGetUserDataMutation,
  useUpdatePhotoMutation,
} from "../../../../store/auth/authApi";
import Button from "../../../Button";

function PhotoUpdateForm() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData] = useGetUserDataMutation({
    fixedCacheKey: "shared-get-user-data",
  });
  const [updatePhoto] = useUpdatePhotoMutation();
  const { register, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    console.log();
    updatePhoto({
      idToken: activeUser?.idToken as string,
      displayName: activeUser?.displayName as string,
      photoUrl: formData.photoUrl as string,
    })
      .unwrap()
      .then(() => {
        if (activeUser) {
          getUserData(activeUser.idToken);
          reset();
        }
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledPinkInput
        type="text"
        placeholder="photo url"
        {...register("photoUrl")}
      />
      <Button view="outline" type="submit">
        Update profile image
      </Button>
    </StyledForm>
  );
}

export default PhotoUpdateForm;
