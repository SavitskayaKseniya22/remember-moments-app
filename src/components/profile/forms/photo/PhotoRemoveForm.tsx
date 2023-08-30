/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { deleteObject, ref } from "firebase/storage";
import { StyledForm } from "../AuthForm";
import { RootState } from "../../../../store/store";
import {
  useGetUserDataMutation,
  useRemovePhotoMutation,
} from "../../../../store/auth/authApi";
import { StyledBasicButton } from "../../../../styledComponents/SharedStyles";
import { storage } from "../../../../services/firebase";

function PhotoRemoveForm() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData] = useGetUserDataMutation({
    fixedCacheKey: "shared-get-user-data",
  });
  const [removePhoto] = useRemovePhotoMutation();
  const { handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {
    const desertRef = ref(storage, activeUser?.profilePicture);
    if (activeUser) {
      const { idToken, displayName } = activeUser;
      deleteObject(desertRef)
        .then(() => {
          return removePhoto({
            idToken,
            displayName,
          }).unwrap();
        })
        .then(() => {
          getUserData(idToken);
        })
        .catch((rejected) => {
          console.error(rejected);
        });
    }
  };

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
      <StyledBasicButton
        $view="outline"
        type="submit"
        disabled={!activeUser?.profilePicture}
      >
        Delete profile image
      </StyledBasicButton>
    </StyledForm>
  );
}

export default PhotoRemoveForm;
