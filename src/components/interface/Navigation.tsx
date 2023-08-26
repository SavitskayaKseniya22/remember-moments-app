import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../store/store";
import { StyledLikeButton } from "../Button";

export const StyledMainNavigation = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-grow: 2;
  a {
    color: #666666;
    text-decoration: none;
    &.active {
      color: rgb(250, 116, 54);
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  ${StyledLikeButton}
  text-decoration: none;
`;

export function checkNavState({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  // eslint-disable-next-line no-nested-ternary
  return isPending ? "pending" : isActive ? "active" : "";
}

function MainNavigation() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);

  return (
    <StyledMainNavigation>
      <NavLink to="/destinations">Destinations</NavLink>
      <NavLink to="/shop">Shop</NavLink>

      {activeUser && (
        <>
          <NavLink to="/board">Board</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </>
      )}
      <NavLink to="/settings">Settings</NavLink>
    </StyledMainNavigation>
  );
}

export default MainNavigation;
