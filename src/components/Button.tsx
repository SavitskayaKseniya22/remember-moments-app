/* eslint-disable react/button-has-type */
import React from "react";
import styled, { css } from "styled-components";

export const StyledLikeButton = css<{
  view: "full" | "outline" | "transparent";
}>`
  padding: 0.5rem 3rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: ${(props) => (props.view === "full" ? "#fd6e09" : "white")};
  color: ${(props) => (props.view === "full" ? "white" : "#fd6e09")};
  border: ${(props) =>
    props.view === "outline" ? "1px solid #fd6e09" : "none"};
  &:disabled {
    pointer-events: none;
    color: gray;
    border-color: gray;
  }
`;

export const StyledBasicButton = styled("button")<{
  view: "full" | "outline" | "transparent";
}>`
  ${StyledLikeButton}
`;

function Button({
  children,
  view,
  type,
  className,
  disabled,
  handleClick,
}: {
  children: JSX.Element | JSX.Element[] | string | undefined;
  view: "full" | "outline" | "transparent";
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  disabled?: boolean;
  handleClick?: () => void;
}) {
  return (
    <StyledBasicButton
      className={className}
      disabled={disabled}
      type={type}
      view={view}
      onClick={handleClick}
    >
      {children}
    </StyledBasicButton>
  );
}

Button.defaultProps = {
  className: undefined,
  type: "button",
  handleClick: () => {},
  disabled: false,
};

export default Button;
