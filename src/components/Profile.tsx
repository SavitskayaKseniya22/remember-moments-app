import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { RootState } from "../store/store";

import { ActiveUserDataTypes } from "../interfaces";
import {
  useGetUserDataMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useDeleteProfileMutation,
} from "../store/auth/authApi";

export function Profile() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const { t } = useTranslation();
  const [getUserData] = useGetUserDataMutation();
  const [changePassword] = useChangePasswordMutation();
  const [changeEmail] = useChangeEmailMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  // const [updateProfile] = useUpdateProfileMutation();
  const [userData, setUserData] = useState<ActiveUserDataTypes | undefined>(
    undefined,
  );

  useEffect(() => {
    if (activeUser) {
      getUserData(activeUser.idToken)
        .unwrap()
        .then((fulfilled) => {
          setUserData(fulfilled);
        });
    }
  }, []);

  return (
    <>
      <ul>
        <li> name: {userData?.displayName}</li>
        <li> email: {userData?.email}</li>
        <li>
          registered:{" "}
          {userData
            ? new Date(Number(userData.createdAt)).toLocaleDateString()
            : ""}
        </li>
        <li>
          last login:{" "}
          {userData
            ? new Date(Number(userData.lastLoginAt)).toLocaleDateString()
            : ""}
        </li>
        <li>
          password changed:{" "}
          {userData
            ? new Date(Number(userData.passwordUpdatedAt)).toLocaleDateString()
            : ""}
        </li>
        <li>status:{userData?.disabled === true ? "disabled" : " active"}</li>
        {userData?.photoUrl && <img src={userData?.photoUrl} alt="profile" />}
        <li>
          initial email:
          {userData?.initialEmail}
        </li>
      </ul>
      <div>
        <button
          type="button"
          onClick={() => {
            changePassword({
              idToken: activeUser?.idToken as string,
              password: "blablabla",
              returnSecureToken: true,
            });
          }}
        >
          {t("auth.action.changePassword")}
        </button>
        <button
          type="button"
          onClick={() => {
            changeEmail({
              idToken: activeUser?.idToken as string,
              email: "blablabla@yuio.com",
              returnSecureToken: true,
            });
          }}
        >
          {t("auth.action.changeEmail")}
        </button>
        <button
          type="button"
          onClick={() => {
            deleteProfile(activeUser?.idToken as string);
          }}
        >
          {t("auth.action.deleteProfile")}
        </button>
        <button type="button" onClick={() => {}}>
          update name
        </button>
        <button type="button" onClick={() => {}}>
          update photo
        </button>
        <button type="button" onClick={() => {}}>
          remove name
        </button>
        <button type="button" onClick={() => {}}>
          remove photo
        </button>
      </div>
    </>
  );
}

export default Profile;
