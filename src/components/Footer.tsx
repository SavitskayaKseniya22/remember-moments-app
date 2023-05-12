import React from "react";
import styled from "styled-components";
import { Cog } from "@styled-icons/boxicons-regular";
import { useLocation, useNavigate } from "react-router-dom";
import { ReturnDownBack } from "@styled-icons/ionicons-outline";
import { StyledRedButton } from "../styledComponents/StyledButton";

export const StyledFooter = styled("footer")`
  background: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledFooter>
      <StyledRedButton
        handleClick={() => {
          navigate("settings");
        }}
        disabled={location.pathname === "/settings"}
      >
        <Cog title="Settings" size="36" />
      </StyledRedButton>

      <span>made by Kseniia Savitskaia in 2023</span>

      <StyledRedButton
        handleClick={() => {
          navigate(-1);
        }}
        disabled={location.pathname === "/"}
      >
        <ReturnDownBack title="Back" size="36" />
      </StyledRedButton>
    </StyledFooter>
  );
}
