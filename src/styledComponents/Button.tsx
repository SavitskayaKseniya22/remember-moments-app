import React from "react";
import { useNavigate } from "react-router-dom";

function Button({
  children,
  path,
  type,
  className,
}: {
  children: JSX.Element | JSX.Element[] | string;
  path: string;
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    switch (path) {
      case "back":
        navigate(-1);
        break;
      case "login":
      case "auth":
        navigate("/auth/login");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "board":
        navigate("/board");
        break;
      case "registration":
        navigate("/auth/registration");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <button
      className={className}
      type={type === "submit" ? "submit" : "button"}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: undefined,
};

export default Button;
