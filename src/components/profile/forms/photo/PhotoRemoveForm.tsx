/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledForm } from "../../../AuthForm";
import { RootState } from "../../../../store/store";
import {
  useGetUserDataMutation,
  useRemovePhotoMutation,
} from "../../../../store/auth/authApi";
import Button from "../../../Button";

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
    removePhoto({
      idToken: activeUser?.idToken as string,
      displayName: activeUser?.displayName as string,
    })
      .unwrap()
      .then(() => {
        if (activeUser) {
          getUserData(activeUser.idToken);
        }
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
      <Button view="outline" type="submit">
        Delete profile image
      </Button>
    </StyledForm>
  );
}

export default PhotoRemoveForm;
