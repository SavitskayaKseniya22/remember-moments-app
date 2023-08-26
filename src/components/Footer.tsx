import React from "react";
import styled from "styled-components";
import { Cog, ArrowToTop } from "@styled-icons/boxicons-regular";
import { useLocation, useNavigate } from "react-router-dom";
import { ReturnDownBack } from "@styled-icons/ionicons-outline";
import { useTranslation } from "react-i18next";
import Button from "./Button";

export const StyledFooter = styled("footer")`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666666;
  padding: 1rem;

  .footer__settings,
  .footer__nav,
  .footer__to-top {
    position: fixed;
    bottom: 0;
  }

  .footer__settings {
    left: 0;
  }

  .footer__nav {
    right: 0;
  }

  .footer__to-top {
    top: 50%;
    right: 0;
    bottom: unset;
  }
`;

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <StyledFooter>
      <Button
        view="transparent"
        className="footer__settings"
        handleClick={() => {
          navigate("settings");
        }}
        disabled={location.pathname === "/settings"}
      >
        <Cog title="Settings" size="36" />
      </Button>
      <span>{t("madeBy")}</span>
      <Button
        view="transparent"
        className="footer__nav"
        handleClick={() => {
          navigate(-1);
        }}
        disabled={location.pathname === "/"}
      >
        <ReturnDownBack title="Back" size="36" />
      </Button>
      <Button
        view="transparent"
        className="footer__to-top"
        handleClick={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      >
        <ArrowToTop title="ArrowToTop" size="36" />
      </Button>
    </StyledFooter>
  );
}
