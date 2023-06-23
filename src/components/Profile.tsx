import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  useChangeEmailMutation,
  useChangePasswordMutation,
  useDeleteProfileMutation,
  useGetUserDataMutation,
} from "../store/authSlice";
import { ActiveUserDataTypes } from "../interfaces";

export function Profile() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData, result] = useGetUserDataMutation();
  const [changePassword] = useChangePasswordMutation();
  const [changeEmail] = useChangeEmailMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  // const [updateProfile] = useUpdateProfileMutation();
  const [userData, setUserData] = useState<ActiveUserDataTypes | undefined>(
    undefined,
  );

  useEffect(() => {
    if (activeUser) {
      getUserData(activeUser.idToken);
    }
  }, []);

  useEffect(() => {
    if (result.status === "fulfilled") {
      setUserData(result.data.users[0]);
    }
  }, [result]);

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
          change password
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
          change email
        </button>
        <button
          type="button"
          onClick={() => {
            deleteProfile({ idToken: activeUser?.idToken as string });
          }}
        >
          delete profile
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
