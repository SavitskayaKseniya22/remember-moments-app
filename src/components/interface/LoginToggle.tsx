import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetActiveUser } from "../../store/auth/authSlice";
import { RootState } from "../../store/store";
import { StyledBasicButton } from "../../styledComponents/SharedStyles";

export function LoginToggle() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return activeUser ? (
    <StyledBasicButton
      $view="outline"
      onClick={() => {
        dispatch(resetActiveUser());
      }}
    >
      Log out
    </StyledBasicButton>
  ) : (
    <StyledBasicButton
      $view="full"
      onClick={() => {
        navigate("/auth/login");
      }}
    >
      Log in
    </StyledBasicButton>
  );
}

export default LoginToggle;
