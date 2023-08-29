/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "../Modal";
import AccountDeleteForm from "./forms/AccountDeleteForm";
import { useGetUserDataMutation } from "../../store/auth/authApi";
import { RootState } from "../../store/store";
import { StyledMainCentred } from "../../styledComponents/SharedStyles";
import Button from "../Button";
import EmailChangeForm from "./forms/EmailChangeForm";
import PasswordChangeForm from "./forms/PasswordChangeForm";
import dummyImage from "../../assets/images/no-image-icon.png";
import PhotoUpdateForm from "./forms/photo/PhotoUpdateForm";
import NameUpdateForm from "./forms/name/NameUpdateForm";
import PhotoRemoveForm from "./forms/photo/PhotoRemoveForm";
import NameRemoveForm from "./forms/name/NameRemoveForm";

export const StyledProfile = styled(StyledMainCentred)`
  ul {
    list-style: none;
    margin: 0;
  }
  h4 {
    display: inline;
  }

  h3 {
    font-family: "Volkhov", serif;
    text-align: center;
    font-size: 1.5rem;
  }

  .data__part {
    display: flex;
    flex-direction: column;

    border-radius: 0.5rem;
    background-color: white;
    border: 2px solid rgb(245, 249, 255);
    padding: 2rem;
    gap: 3rem;
  }

  .data__profile-image {
    border-radius: 50%;
    border: 2px solid rgb(245, 249, 255);
    align-self: center;
  }

  .data-part__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    & > li {
      width: 100%;
      & > button {
        width: 100%;
      }
    }
  }
`;

export function Profile() {
  const [modalType, setModalType] = useState<
    undefined | "password" | "email" | "account" | "delete"
  >(undefined);

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
    <StyledProfile>
      <div className="data__part_main data__part">
        <img
          className="data__profile-image"
          src={data?.photoUrl || dummyImage}
          alt="profile"
          width={200}
          height={200}
        />
        <div>
          <h3>{data?.displayName || "Unknown"}</h3>
          <ul className="data-part__list">
            <li>
              <h4>Email: </h4>
              {data?.email || "Unknown"}
            </li>
            <li>
              <h4>Last login: </h4>
              {new Date(Number(data?.lastLoginAt)).toLocaleDateString()}
            </li>
            <li>
              <h4>Registered: </h4>
              {new Date(Number(data?.createdAt)).toLocaleDateString()}
            </li>
            <li>
              <h4>Password changed: </h4>
              {new Date(Number(data?.passwordUpdatedAt)).toLocaleDateString()}
            </li>

            {data?.initialEmail && (
              <li>
                <h4>Initial email: </h4>
                {data?.initialEmail}
              </li>
            )}
          </ul>
        </div>
        <ul className="data-part__list">
          <li>
            <Button
              view="outline"
              type="button"
              handleClick={() => {
                if (activeUser) {
                  getUserData(activeUser.idToken);
                }
              }}
            >
              {t("auth.action.refreshData")}
            </Button>
          </li>
          <li>
            <Button
              view="full"
              type="button"
              handleClick={() => {
                setModalType("delete");
              }}
            >
              {t("auth.action.deleteProfile")}
            </Button>
          </li>
        </ul>
      </div>

      <div className="data__part_sub data__part">
        <NameUpdateForm />
        <NameRemoveForm />
        <EmailChangeForm />
        <PasswordChangeForm />
        <PhotoUpdateForm />
        <PhotoRemoveForm />
      </div>

      <Modal
        isOpen={Boolean(modalType)}
        closeModal={() => {
          setModalType(undefined);
        }}
      >
        <>{modalType === "delete" && <AccountDeleteForm />}</>
      </Modal>
    </StyledProfile>
  );
}

export default Profile;
