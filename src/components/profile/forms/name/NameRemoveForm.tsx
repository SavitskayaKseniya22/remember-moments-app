import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useSelector } from "react-redux";
import { StyledForm } from "../../../AuthForm";
import { RootState } from "../../../../store/store";
import {
  useGetUserDataMutation,
  useRemoveNameMutation,
} from "../../../../store/auth/authApi";
import Button from "../../../Button";

function NameRemoveForm() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData] = useGetUserDataMutation({
    fixedCacheKey: "shared-get-user-data",
  });
  const [removeName] = useRemoveNameMutation();
  const { handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FieldValues> = () => {
    removeName({
      idToken: activeUser?.idToken as string,
      photoUrl: activeUser?.profilePicture as string,
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
        Delete name
      </Button>
    </StyledForm>
  );
}

export default NameRemoveForm;
