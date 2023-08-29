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
    if (activeUser) {
      const { idToken, profilePicture: photoUrl } = activeUser;
      removeName({
        idToken,
        photoUrl,
      })
        .unwrap()
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
      <Button view="outline" type="submit" disabled={!activeUser?.displayName}>
        Delete name
      </Button>
    </StyledForm>
  );
}

export default NameRemoveForm;
