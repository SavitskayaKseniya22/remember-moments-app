import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { ActiveUserTypes } from "../../interfaces";
import Emphasis from "./Emphasis";
import dummyImage from "../../assets/images/no-image-icon.png";

export const StyledGreetings = styled("div")`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  .greetings__image {
    border-radius: 50%;
  }
`;

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
    <StyledGreetings>
      <img
        className="greetings__image"
        src={activeUser?.profilePicture || dummyImage}
        alt="profile"
        width={35}
        height={35}
      />
      <h4 className="greetings__title">
        Welcome, <Emphasis>{name}</Emphasis>!
      </h4>
    </StyledGreetings>
  );
}

export default Greetings;
