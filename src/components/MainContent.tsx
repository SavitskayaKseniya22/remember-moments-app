import React from "react";
import styled from "styled-components";

export const StyledMainContent = styled("main")`
  background-color: rgba(0, 0, 0, 0.3);
  flex-grow: 1;
  flex-direction: column;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function MainContent({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  return <StyledMainContent>{children}</StyledMainContent>;
}

export default MainContent;
