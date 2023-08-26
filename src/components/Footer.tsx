import React from "react";
import styled from "styled-components";
import { ArrowToTop } from "@styled-icons/boxicons-regular";
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

  .footer__nav,
  .footer__to-top {
    position: fixed;
    bottom: 0;
  }

  .footer__to-top {
    left: 0;
  }

  .footer__nav {
    right: 0;
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
    </StyledFooter>
  );
}
