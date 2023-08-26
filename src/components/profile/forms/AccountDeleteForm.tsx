import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledForm } from "../../AuthForm";
import { RootState } from "../../../store/store";
import { useDeleteProfileMutation } from "../../../store/auth/authApi";
import Button from "../../Button";

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
      <Button view="outline" type="submit">
        Yes
      </Button>
    </StyledForm>
  );
}

export default AccountDeleteForm;
