import React from "react";
import styled from "styled-components";
import { Time } from "./Time";
import { Weather } from "./Weather";
import { flexboxLineStyle } from "../styledComponents/SharedStyles";

export const StyledInfoHeader = styled("div")`
  ${flexboxLineStyle}
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
