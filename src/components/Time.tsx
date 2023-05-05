import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatTime, getTime } from "../utils";

export const StyledTime = styled("span")`
  font-weight: bold;
  font-size: 4rem;
  flex-grow: 2;
  text-align: center;
`;

export function Time() {
  const [time, setTime] = useState(formatTime(getTime()));

  useEffect(() => {
    setTimeout(() => {
      const newTime = formatTime(getTime());
      setTime(newTime);
    }, 1000);
  });

  return (
    <StyledTime>
      {time.hours} : {time.minutes} : {time.seconds}
    </StyledTime>
  );
}
