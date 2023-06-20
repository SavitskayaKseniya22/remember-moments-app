import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const StyledTimeBox = styled("div")`
  flex-grow: 1;
`;

export const StyledTime = styled("span")`
  font-weight: bold;
  font-size: 1.5rem;
`;
export const StyledDate = styled("span")`
  font-weight: normal;
  font-size: 1rem;
`;

export function Time() {
  const [time, setTime] = useState(new Date());
  const { i18n } = useTranslation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <StyledTimeBox>
      <StyledTime>
        {time.toLocaleTimeString(i18n.language, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </StyledTime>

      <br />
      <StyledDate>
        {time.toLocaleDateString(i18n.language, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </StyledDate>
    </StyledTimeBox>
  );
}
