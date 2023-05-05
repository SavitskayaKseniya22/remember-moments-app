import React from "react";
import styled from "styled-components";

const StyledBasicButton = styled("button")`
  background: transparent;
  border: none;
  padding: 1rem;
  cursor: pointer;
`;

const StyledRedButton = styled(StyledBasicButton)`
  color: #fd6e09;
`;

function Button({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <StyledRedButton>{children}</StyledRedButton>;
}

export default Button;
