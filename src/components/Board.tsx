import React from "react";
import styled from "styled-components";
import { Widget } from "./Widget";

export const StyledBoard = styled("div")`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export function Board() {
  return (
    <StyledBoard>
      <Widget />
    </StyledBoard>
  );
}

export default Board;
