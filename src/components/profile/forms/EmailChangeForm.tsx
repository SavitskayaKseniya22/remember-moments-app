/* eslint-disable react/jsx-props-no-spreading */
import { t } from "i18next";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { Id, toast } from "react-toastify";
import { StyledForm, StyledPinkInput } from "./AuthForm";
import { RootState } from "../../../store/store";
import { useChangeEmailMutation } from "../../../store/auth/authApi";
import { StyledBasicButton } from "../../../styledComponents/SharedStyles";

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
    if (activeUser) {
      changeEmail({
        idToken: activeUser.idToken,
        email: formData.email,
      });
    }
  };

  const emailToastId = React.useRef<null | Id>(null);
  useEffect(() => {
    if (emailToastId.current) {
      toast.dismiss(emailToastId.current as Id);
    }
    if (errors.email) {
      emailToastId.current = toast.warn(
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p>{message}</p>}
        />,
        {
          autoClose: false,
        },
      );
    }
  }, [errors, errors.email]);

  return (
    <StyledForm method="post" onSubmit={handleSubmit(onSubmit)} noValidate>
      <StyledPinkInput
        type="email"
        placeholder={activeUser?.email || "Email"}
        defaultValue=""
        {...register("email", {
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
      <StyledBasicButton $view="outline" type="submit">
        Update email
      </StyledBasicButton>
    </StyledForm>
  );
}

export default EmailChangeForm;
