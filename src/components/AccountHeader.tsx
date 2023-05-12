import { LogOut, LogIn } from "@styled-icons/boxicons-regular";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { StyledRedButton } from "../styledComponents/StyledButton";
import { UserTypes } from "../interfaces";

export const StyledAccountHeader = styled("div")`
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

function checkName(user: UserTypes) {
  const { userData } = user;
  if (userData) {
    const { displayName, email } = userData.users[0];
    return displayName || email;
  }
  return "Stranger";
}

export function AccountHeader() {
  const user = useRouteLoaderData("root") as UserTypes;
  const [name, setName] = useState(checkName(user));
  const navigate = useNavigate();

  useEffect(() => {
    const userName = checkName(user);
    setName(userName);
  }, [user]);

  return (
    <StyledAccountHeader>
      <span>Welcome, {name}!</span>
      {name !== "Stranger" ? (
        <StyledRedButton
          handleClick={() => {
            navigate("/auth/logout");
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
