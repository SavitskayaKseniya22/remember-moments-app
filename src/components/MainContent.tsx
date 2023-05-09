import React from "react";
import styled from "styled-components";
import { ReturnDownBack } from "@styled-icons/ionicons-outline";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../styledComponents/StyledButton";

export const StyledMainContent = styled("main")`
  background-color: rgba(0, 0, 0, 0.3);
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
    </StyledMainContent>
  );
}

export default MainContent;
