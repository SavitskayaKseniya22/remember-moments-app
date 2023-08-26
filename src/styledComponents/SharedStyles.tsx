import styled, { css } from "styled-components";

export const transparentStyle = css`
  background-color: transparent;
  color: rgb(252, 223, 253);
`;

export const flexboxLineStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledListOfItems = styled("ul")`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;
