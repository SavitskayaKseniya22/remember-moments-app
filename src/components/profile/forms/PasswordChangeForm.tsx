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
    if (activeUser) {
      changePassword({
        idToken: activeUser.idToken,
        password: formData.password,
      });
    }
  };

  const passwordToastId = React.useRef<null | Id>(null);
  useEffect(() => {
    if (passwordToastId.current) {
      toast.dismiss(passwordToastId.current as Id);
    }
    if (errors.password) {
      passwordToastId.current = toast.warn(
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p>{message}</p>}
        />,
        {
          autoClose: false,
        },
      );
    }
  }, [errors, errors.password]);

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledPinkInput
        type="password"
        placeholder="password"
        defaultValue=""
        {...register("password", {
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
        Update password
      </Button>
    </StyledForm>
  );
}

export default PasswordChangeForm;
