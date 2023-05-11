import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const StyledAccountHeader = styled("div")`
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export function AccountHeader() {
  const [name, setName] = useState("Stranger");

  useEffect(() => {
    const storage = window.localStorage;
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
    </StyledAccountHeader>
  );
}
