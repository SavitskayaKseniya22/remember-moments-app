import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledRedOutlineButton } from "../../../styledComponents/StyledButton";
import { StyledForm } from "../../AuthForm";
import { RootState } from "../../../store/store";
import { useDeleteProfileMutation } from "../../../store/auth/authApi";

function AccountDeleteForm() {
  const [deleteProfile] = useDeleteProfileMutation();
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const { handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = () => {
    deleteProfile(activeUser?.idToken as string);
  };

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)}>
      <p>Are you sure you want to delete your account?</p>
      <StyledRedOutlineButton type="submit">Yes</StyledRedOutlineButton>
    </StyledForm>
  );
}

export default AccountDeleteForm;
