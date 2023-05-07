import React from "react";

function Button({
  children,
  type,
  className,
  handleClick,
}: {
  children: JSX.Element | JSX.Element[] | string;

  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  handleClick: () => void;
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} type={type} onClick={handleClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: undefined,
  type: "button",
};

export default Button;
