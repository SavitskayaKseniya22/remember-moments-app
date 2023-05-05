import React from "react";
import { useNavigate } from "react-router-dom";
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

function Button({
  children,
  path,
}: {
  children: JSX.Element | JSX.Element[];
  path: string;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    switch (path) {
      case "login":
        navigate("/login");
        break;
      case "settings":
        navigate("/settings");
        break;
      default:
        navigate("/");
        break;
    }
  };
  return <StyledRedButton onClick={handleClick}>{children}</StyledRedButton>;
}

export default Button;
