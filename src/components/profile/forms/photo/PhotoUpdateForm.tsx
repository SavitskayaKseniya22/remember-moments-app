/* eslint-disable react/jsx-props-no-spreading */
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import React from "react";
import { useForm, SubmitHandler, FieldValues, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StyledForm } from "../AuthForm";
import { RootState } from "../../../../store/store";
import {
  useGetUserDataMutation,
  useUpdatePhotoMutation,
} from "../../../../store/auth/authApi";
import {
  StyledBasicButton,
  StyledLikeButton,
} from "../../../../styledComponents/SharedStyles";
import { storage } from "../../../../services/firebase";

export const StyledLabel = styled("label")`
  ${StyledLikeButton}
  input[type="file"] {
    display: none;
  }
`;

function PhotoUpdateForm() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData] = useGetUserDataMutation({
    fixedCacheKey: "shared-get-user-data",
  });
  const [updatePhoto] = useUpdatePhotoMutation();
  const { register, handleSubmit, reset, control } = useForm({
    mode: "onSubmit",
  });

  const fileValue = useWatch({ control, name: "file" });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const file = formData.file[0];
    if (file && activeUser) {
      const { email, idToken, displayName } = activeUser;
      const storageRef = ref(storage, `/avatars/${email}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask
        .then(() => {
          return getDownloadURL(uploadTask.snapshot.ref);
        })
        .then((url) => {
          return updatePhoto({
            idToken,
            displayName,
            photoUrl: url as string,
          }).unwrap();
        })
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
      <StyledLabel
        htmlFor="file"
        $view={fileValue && fileValue[0] ? "transparent" : "full"}
      >
        {fileValue && fileValue[0] ? fileValue[0].name : "Choose image"}
        <input type="file" id="file" {...register("file")} />
      </StyledLabel>
      <StyledBasicButton $view="outline" type="submit">
        Update profile image
      </StyledBasicButton>
    </StyledForm>
  );
}

export default PhotoUpdateForm;
