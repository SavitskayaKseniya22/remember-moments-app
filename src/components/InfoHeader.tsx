import React from "react";
import styled from "styled-components";
import { Time } from "./Time";
import { Weather } from "./Weather";

export const StyledInfoHeader = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
`;

export function InfoHeader() {
  return (
    <StyledInfoHeader>
      <Time />
      <Weather />
    </StyledInfoHeader>
  );
}
