/* eslint-disable react/button-has-type */
import React from "react";

function Button({
  children,
  type,
  className,
  disabled,
  handleClick,
}: {
  children: JSX.Element | JSX.Element[] | string | undefined;

  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  disabled?: boolean;
  handleClick?: () => void;
}) {
  return (
    <button
      className={className}
      disabled={disabled}
      type={type}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: undefined,
  type: "button",
  handleClick: () => {},
  disabled: false,
};

export default Button;
