import React from "react";
import styled from "styled-components";
import bg from "../../assets/images/Image.png";

import { Header } from "../../components/Header";
import Emphasis from "../../components/interface/Emphasis";
import { StyledNavLink } from "../../components/interface/Navigation";

export const StyledFirstScreen = styled("div")`
  height: 100vh;
  background: no-repeat center right url(${bg}), #fefcfb;
  display: flex;
  flex-direction: column;

  .first-screen__content {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 3rem;
    flex-grow: 2;
    margin-left: 3rem;

    .content__title {
      font-size: 3rem;
      margin: 0;
      line-height: 4.5rem;
      font-family: "Volkhov", serif;
    }

    .content__info {
      font-size: 1.5rem;
      color: #666666;
      line-height: 2rem;
    }
  }
`;

function FirstScreen() {
  return (
    <StyledFirstScreen>
      <Header />
      <div className="first-screen__content">
        <h2 className="content__title">
          Get started your exciting <Emphasis>journey</Emphasis>
        </h2>
        <p className="content__info">
          A Team of experienced tourism professionals will provide you with the
          best advice and tips for your desire place.
        </p>
        <StyledNavLink to="/auth/login" $view="full">
          Start an unforgettable trip
        </StyledNavLink>
      </div>
    </StyledFirstScreen>
  );
}

export default FirstScreen;
