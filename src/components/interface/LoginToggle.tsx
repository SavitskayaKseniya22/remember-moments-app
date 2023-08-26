import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetActiveUser } from "../../store/auth/authSlice";
import { RootState } from "../../store/store";
import Button from "../Button";

export function LoginToggle() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return activeUser ? (
    <Button
      view="outline"
      handleClick={() => {
        dispatch(resetActiveUser());
      }}
    >
      Log out
    </Button>
  ) : (
    <Button
      view="full"
      handleClick={() => {
        navigate("/auth/login");
      }}
    >
      Log in
    </Button>
  );
}

export default LoginToggle;
