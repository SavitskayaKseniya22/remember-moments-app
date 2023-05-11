import React from "react";
import styled from "styled-components";
import { ReturnDownBack } from "@styled-icons/ionicons-outline";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../styledComponents/StyledButton";
import { AccountHeader } from "./AccountHeader";

export const StyledMainContent = styled("main")`
  background-color: rgba(0, 0, 0, 0.3);
  flex-grow: 1;
  flex-direction: column;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StyledExpandedContainer = styled("div")`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function MainContent({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledMainContent>
      <AccountHeader />
      <StyledExpandedContainer>
        {children}
        {location.pathname !== "/" && (
          <BackButton
            handleClick={() => {
              navigate(-1);
            }}
          >
            <ReturnDownBack title="Back" size="48" />
          </BackButton>
        )}
      </StyledExpandedContainer>
    </StyledMainContent>
  );
}

export default MainContent;
