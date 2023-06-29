/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledRedOutlineButton } from "../../../styledComponents/StyledButton";
import { StyledForm, StyledPinkInput } from "../../AuthForm";

import { RootState } from "../../../store/store";
import {
  useUpdateProfileMutation,
  useGetUserDataMutation,
} from "../../../store/auth/authApi";

function AccountUpdateForm({ closeModal }: { closeModal: () => void }) {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData] = useGetUserDataMutation({
    fixedCacheKey: "shared-get-user-data",
  });
  const [updateProfile] = useUpdateProfileMutation();
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    updateProfile({
      idToken: activeUser?.idToken as string,
      displayName: formData.displayName as string,
      photoUrl: formData.photoUrl as string,
      deleteAttribute: (formData.deletion as string[]) || [],
      returnSecureToken: true,
    })
      .unwrap()
      .then(() => {
        if (activeUser) {
          getUserData(activeUser.idToken);
          closeModal();
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
        placeholder="name"
        {...register("displayName")}
      />
      <StyledPinkInput
        type="text"
        placeholder="photo"
        {...register("photoUrl")}
      />
      <label htmlFor="displayNameCheckbox">
        Remove name
        <input
          {...register("deletion")}
          type="checkbox"
          value="DISPLAY_NAME"
          id="displayNameCheckbox"
        />
      </label>
      <label htmlFor="photoUrlCheckbox">
        Remove photo
        <input
          {...register("deletion")}
          type="checkbox"
          value="PHOTO_URL"
          id="photoUrlCheckbox"
        />
      </label>
      <StyledRedOutlineButton type="submit">Enter</StyledRedOutlineButton>
    </StyledForm>
  );
}

export default AccountUpdateForm;
