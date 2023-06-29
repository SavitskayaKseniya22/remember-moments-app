/* eslint-disable react/jsx-props-no-spreading */
import { t } from "i18next";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { Id, toast } from "react-toastify";
import { StyledRedOutlineButton } from "../../../styledComponents/StyledButton";
import { StyledForm, StyledPinkInput } from "../../AuthForm";
import { RootState } from "../../../store/store";
import { useChangeEmailMutation } from "../../../store/auth/authApi";

function EmailChangeForm() {
  const [changeEmail] = useChangeEmailMutation();
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    changeEmail({
      idToken: activeUser?.idToken as string,
      email: formData.email,
      returnSecureToken: true,
    });
  };

  const emailToChangeToastId = React.useRef<null | Id>(null);
  useEffect(() => {
    if (emailToChangeToastId.current) {
      toast.dismiss(emailToChangeToastId.current as Id);
    }
    if (errors.emailToChange) {
      emailToChangeToastId.current = toast.warn(
        <ErrorMessage
          errors={errors}
          name="emailToChange"
          render={({ message }) => <p>{message}</p>}
        />,
        {
          autoClose: false,
        },
      );
    }
  }, [errors, errors.emailToChange]);

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledPinkInput
        type="email"
        placeholder="email"
        defaultValue=""
        {...register("emailToChange", {
          required: {
            value: true,
            message: `Email: ${t("formValidation.required")}`,
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: `Email: ${t("formValidation.email")}`,
          },
        })}
      />
      <StyledRedOutlineButton type="submit">Enter</StyledRedOutlineButton>
    </StyledForm>
  );
}

export default EmailChangeForm;
