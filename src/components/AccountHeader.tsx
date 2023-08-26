import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/store";
import { resetActiveUser } from "../store/auth/authSlice";
import { ActiveUserTypes } from "../interfaces";
import Button from "./Button";
import Emphasis from "./interface/Emphasis";

function checkName(user: ActiveUserTypes | undefined) {
  if (user) {
    const { displayName, email } = user;
    return displayName || email;
  }
  return "Stranger";
}

export function Greetings() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const [name, setName] = useState(checkName(activeUser));

  useEffect(() => {
    const userName = checkName(activeUser);
    setName(userName);
  }, [activeUser]);

  return (
    <div>
      Welcome, <Emphasis>{name}</Emphasis>!
    </div>
  );
}

export const StyledAccountHeader = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  background-color: white;
  padding: 0 1rem;
`;

export function AccountHeader() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <StyledAccountHeader>
      {activeUser ? (
        <>
          <Button
            view="outline"
            handleClick={() => {
              navigate("/board");
            }}
          >
            Board
          </Button>
          <Button
            view="outline"
            handleClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </Button>
          <Button
            view="outline"
            handleClick={() => {
              dispatch(resetActiveUser());
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <Button
          view="full"
          handleClick={() => {
            navigate("/auth/login");
          }}
        >
          Log in
        </Button>
      )}
    </StyledAccountHeader>
  );
}

export default AccountHeader;
