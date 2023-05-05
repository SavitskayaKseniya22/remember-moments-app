import React from "react";
import styled from "styled-components";

export const StyledFooter = styled("footer")`
  background: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  padding: 1rem;
  text-align: center;
`;

export function Footer() {
  return <StyledFooter> made by Kseniia Savitskaia in 2023</StyledFooter>;
}
