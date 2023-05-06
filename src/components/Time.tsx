import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const StyledTimeBox = styled("div")`
  flex-grow: 2;
  text-align: center;
`;

export const StyledTime = styled("span")`
  font-weight: bold;
  font-size: 2rem;
`;
export const StyledDate = styled("span")`
  font-weight: normal;
  font-size: 1.5rem;
`;

export function Time() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date());
    }, 1000);
  });

  return (
    <StyledTimeBox>
      <StyledTime>
        {time.toLocaleTimeString("en-Us", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </StyledTime>

      <br />
      <StyledDate>
        {time.toLocaleDateString("en-Us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </StyledDate>
    </StyledTimeBox>
  );
}
