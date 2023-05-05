import React, { useState } from "react";
import styled from "styled-components";
import { formatTime, getTime } from "../utils";

export const StyledTime = styled("div")`
  color: #fcdffd;
  font-weight: bold;
  font-size: 4rem;
`;

export function Time() {
  const [time] = useState(formatTime(getTime()));
  /*
  setInterval(() => {
    const newTime = formatTime(getTime());
    setTime(newTime);
  }, 1000); */

  return (
    <StyledTime>
      {time.hours}:{time.minutes}:{time.seconds}
    </StyledTime>
  );
}
