import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ActiveUserTypes } from "../../interfaces";
import Emphasis from "./Emphasis";

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

export default Greetings;
