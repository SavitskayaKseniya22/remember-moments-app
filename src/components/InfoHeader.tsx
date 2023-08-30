import React from "react";
import styled from "styled-components";
import { Time } from "./Time";
import { WeatherContainer } from "./weather/WeatherContainer";

export const StyledInfoHeader = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
`;

export function InfoHeader() {
  return (
    <StyledInfoHeader>
      <Time />
      <WeatherContainer />
    </StyledInfoHeader>
  );
}
