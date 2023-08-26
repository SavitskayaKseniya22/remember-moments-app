/* eslint-disable react/jsx-props-no-spreading */
import { t } from "i18next";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { toast, Id } from "react-toastify";
import { StyledForm, StyledPinkInput } from "../../AuthForm";
import { useChangePasswordMutation } from "../../../store/auth/authApi";
import { RootState } from "../../../store/store";
import Button from "../../Button";

function PasswordChangeForm() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [changePassword] = useChangePasswordMutation();
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
    changePassword({
      idToken: activeUser?.idToken as string,
      password: formData.password,
      returnSecureToken: true,
    });
  };

  const passwordToChangeToastId = React.useRef<null | Id>(null);
  useEffect(() => {
    if (passwordToChangeToastId.current) {
      toast.dismiss(passwordToChangeToastId.current as Id);
    }
    if (errors.passwordToChange) {
      passwordToChangeToastId.current = toast.warn(
        <ErrorMessage
          errors={errors}
          name="passwordToChange"
          render={({ message }) => <p>{message}</p>}
        />,
        {
          autoClose: false,
        },
      );
    }
  }, [errors, errors.passwordToChange]);

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledPinkInput
        type="password"
        placeholder="password"
        defaultValue=""
        {...register("passwordToChange", {
          required: {
            value: true,
            message: `Password: ${t("formValidation.required")}`,
          },
          minLength: {
            value: 5,
            message: `Password: ${t("formValidation.short")}`,
          },
        })}
      />
      <Button view="outline" type="submit">
        Enter
      </Button>
    </StyledForm>
  );
}

export default PasswordChangeForm;
