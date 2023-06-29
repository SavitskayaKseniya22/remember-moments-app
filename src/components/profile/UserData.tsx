import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetUserDataMutation } from "../../store/auth/authApi";
import { RootState } from "../../store/store";

function UserData() {
  const { t } = useTranslation();
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [getUserData, { data }] = useGetUserDataMutation({
    fixedCacheKey: "shared-get-user-data",
  });

  useEffect(() => {
    if (activeUser) {
      getUserData(activeUser.idToken);
    }
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data && (
        <ul>
          {data.displayName && <li> name: {data.displayName}</li>}

          <li> email: {data.email}</li>
          <li>
            registered: {new Date(Number(data.createdAt)).toLocaleDateString()}
          </li>
          <li>
            last login:{" "}
            {new Date(Number(data.lastLoginAt)).toLocaleDateString()}
          </li>
          <li>
            password changed:{" "}
            {new Date(Number(data.passwordUpdatedAt)).toLocaleDateString()}
          </li>

          {data?.photoUrl && <img src={data?.photoUrl} alt="profile" />}
          {data?.initialEmail && (
            <li>
              initial email:
              {data?.initialEmail}
            </li>
          )}

          <li>
            <button
              type="button"
              onClick={() => {
                if (activeUser) {
                  getUserData(activeUser.idToken);
                }
              }}
            >
              {t("auth.action.refreshData")}
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default UserData;
