import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const StyledTime = styled("span")`
  font-weight: bold;
  font-size: 4rem;
  flex-grow: 2;
  text-align: center;
`;

export function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date());
    }, 1000);
  });

  return (
    <StyledTime>
      {time.toLocaleTimeString("en-Us", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
      <br />
      {time.toLocaleDateString("en-Us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </StyledTime>
  );
}
