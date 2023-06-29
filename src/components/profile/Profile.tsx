import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PasswordChangeForm from "./forms/PasswordChangeForm";
import AccountDeleteForm from "./forms/AccountDeleteForm";
import AccountUpdateForm from "./forms/AccountUpdateForm";
import EmailChangeForm from "./forms/EmailChangeForm";
import UserData from "./UserData";
import Modal from "../Modal";

export function Profile() {
  const { t } = useTranslation();

  const [modalType, setModalType] = useState<
    undefined | "password" | "email" | "account" | "delete"
  >(undefined);

  return (
    <>
      <UserData />
      <div>
        <button
          type="button"
          onClick={() => {
            setModalType("password");
          }}
        >
          {t("auth.action.changePassword")}
        </button>
        <button
          type="button"
          onClick={() => {
            setModalType("email");
          }}
        >
          {t("auth.action.changeEmail")}
        </button>
        <button
          type="button"
          onClick={() => {
            setModalType("delete");
          }}
        >
          {t("auth.action.deleteProfile")}
        </button>
        <button
          type="button"
          onClick={() => {
            setModalType("account");
          }}
        >
          {t("auth.action.updateData")}
        </button>
      </div>

      <Modal
        isOpen={Boolean(modalType)}
        closeModal={() => {
          setModalType(undefined);
        }}
      >
        <>
          {modalType === "password" && <PasswordChangeForm />}
          {modalType === "email" && <EmailChangeForm />}
          {modalType === "delete" && <AccountDeleteForm />}
          {modalType === "account" && (
            <AccountUpdateForm
              closeModal={() => {
                setModalType(undefined);
              }}
            />
          )}
        </>
      </Modal>
    </>
  );
}

export default Profile;
