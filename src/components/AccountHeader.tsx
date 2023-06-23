import { LogOut, LogIn } from "@styled-icons/boxicons-regular";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StyledRedButton } from "../styledComponents/StyledButton";
import { RootState } from "../store/store";
import { ActiveUserTypes, resetActiveUser } from "../store/authSlice";

export const StyledAccountHeader = styled("div")`
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

function checkName(user: ActiveUserTypes | undefined) {
  if (user) {
    const { displayName, email } = user;
    return displayName || email;
  }
  return "Stranger";
}

export function AccountHeader() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [name, setName] = useState(checkName(activeUser));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userName = checkName(activeUser);
    setName(userName);
  }, [activeUser]);

  return (
    <StyledAccountHeader>
      <span>Welcome, {name}!</span>
      {name !== "Stranger" ? (
        <StyledRedButton
          handleClick={() => {
            dispatch(resetActiveUser());
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
