import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledForm } from "./AuthForm";
import { RootState } from "../../../store/store";
import { useDeleteProfileMutation } from "../../../store/auth/authApi";
import { StyledBasicButton } from "../../../styledComponents/SharedStyles";

function AccountDeleteForm() {
  const [deleteProfile] = useDeleteProfileMutation();
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const { handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (activeUser) {
      deleteProfile(activeUser.idToken);
    }
  };

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
      <p>Are you sure you want to delete your account?</p>
      <StyledBasicButton $view="outline" type="submit">
        Yes
      </StyledBasicButton>
    </StyledForm>
  );
}

export default AccountDeleteForm;
