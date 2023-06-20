import React from "react";
import styled from "styled-components";
import { Cog } from "@styled-icons/boxicons-regular";
import { useLocation, useNavigate } from "react-router-dom";
import { ReturnDownBack } from "@styled-icons/ionicons-outline";
import { useTranslation } from "react-i18next";
import { StyledRedButton } from "../styledComponents/StyledButton";
import { flexboxLineStyle } from "../styledComponents/SharedStyles";

export const StyledFooter = styled("footer")`
  background: rgba(0, 0, 0, 0.5);
  ${flexboxLineStyle}
`;

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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

      <span>{t("madeBy")}</span>

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
