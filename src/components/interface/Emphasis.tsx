import React from "react";
import styled from "styled-components";

const StyledEmphasis = styled("span")`
  color: #fa7436;
`;

function Emphasis({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  return <StyledEmphasis>{children}</StyledEmphasis>;
}

export default Emphasis;
