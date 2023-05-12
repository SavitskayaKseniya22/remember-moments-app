import { LogOut, LogIn } from "@styled-icons/boxicons-regular";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StyledRedButton } from "../styledComponents/StyledButton";

export const StyledAccountHeader = styled("div")`
  background: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export function AccountHeader() {
  const [name, setName] = useState("Stranger");
  const navigate = useNavigate();
  const storage = window.localStorage;

  useEffect(() => {
    const userData = storage.getItem("activeUserData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      const { displayName, email } = parsedData.users[0];
      setName(displayName || email);
    }
  });

  return (
    <StyledAccountHeader>
      <span>Welcome, {name}!</span>
      {storage.activeUser ? (
        <StyledRedButton
          handleClick={() => {
            storage.removeItem("activeUser");
            storage.removeItem("activeUserData");
            navigate("/");
          }}
        >
          <LogOut title="LogOut" size="36" />
        </StyledRedButton>
      ) : (
        <StyledRedButton
          handleClick={() => {
            navigate("/auth/login");
          }}
        >
          <LogIn title="Login" size="36" />
        </StyledRedButton>
      )}
    </StyledAccountHeader>
  );
}
