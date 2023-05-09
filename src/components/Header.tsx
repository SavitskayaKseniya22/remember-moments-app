import React from "react";
import styled from "styled-components";
import { LogOut, LogIn, Cog } from "@styled-icons/boxicons-regular";
import { useNavigate } from "react-router-dom";
import { Time } from "./Time";
import { StyledRedButton } from "../styledComponents/StyledButton";

export const StyledHeader = styled("header")`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export function Header() {
  const navigate = useNavigate();
  const storage = window.localStorage;
  return (
    <StyledHeader>
      <StyledRedButton
        handleClick={() => {
          navigate("settings");
        }}
      >
        <Cog title="Settings" size="48" />
      </StyledRedButton>
      <Time />
      {storage.activeUser ? (
        <StyledRedButton
          handleClick={() => {
            storage.removeItem("activeUser");
            navigate("/");
          }}
        >
          <LogOut title="LogOut" size="48" />
        </StyledRedButton>
      ) : (
        <StyledRedButton
          handleClick={() => {
            navigate("/auth/login");
          }}
        >
          <LogIn title="Login" size="48" />
        </StyledRedButton>
      )}
    </StyledHeader>
  );
}
