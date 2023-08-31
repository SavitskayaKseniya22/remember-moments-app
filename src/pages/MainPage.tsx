import React from "react";
import styled from "styled-components";
import Emphasis from "../components/interface/Emphasis";
import PopularPlacesList from "./mainPage/PopularPlacesList";
import FirstScreen from "./mainPage/FirstScreen";
import ShopItemList from "./shop/ShopItemList";
import { StyledNavLink } from "../components/interface/Navigation";
import {
  StyledMainCentredColumn,
  styledCentredFlexbox,
} from "../styledComponents/SharedStyles";

export const StyledTitle = styled("div")`
  ${styledCentredFlexbox}
  flex-direction: column;
  padding: 3rem;
  gap: 1rem;

  .title_middle {
    margin: 0;
    font-size: 2rem;
    font-family: "Volkhov", serif;
    color: #222222;
  }

  .title_small {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 300;
    color: #666666;
  }
`;

export const StyledMainPageBlock = styled("div")`
  ${styledCentredFlexbox}
  width:100%;
  background-color: #f5f9ff;
  flex-direction: column;
  padding: 2rem;
`;

export function MainPage() {
  return (
    <StyledMainCentredColumn>
      <FirstScreen />
      <StyledTitle>
        <h2 className="title_middle">
          Choose <Emphasis>a location</Emphasis>
        </h2>
        <h3 className="title_small">
          Choose a popular location or find a hidden gem
        </h3>
      </StyledTitle>
      <StyledMainPageBlock>
        <PopularPlacesList />
        <StyledNavLink $view="full" to="/destinations">
          Go to explore other places
        </StyledNavLink>
      </StyledMainPageBlock>
      <StyledTitle>
        <h2 className="title_middle">
          Buy <Emphasis>a ticket</Emphasis>
        </h2>
        <h3 className="title_small">Book a ticket in the aggregator widget</h3>
      </StyledTitle>
      <StyledMainPageBlock />
      <StyledTitle>
        <h2 className="title_middle">
          Plan <Emphasis>a route</Emphasis>
        </h2>
        <h3 className="title_small">
          Create an itinerary for places of interest
        </h3>
      </StyledTitle>
      <StyledMainPageBlock />
      <StyledTitle>
        <h2 className="title_middle">
          Gather <Emphasis>everything you need</Emphasis>
        </h2>
        <h3 className="title_small">
          Don&apos;t forget a roomy backpack or a nice passport cover
        </h3>
      </StyledTitle>
      <StyledMainPageBlock>
        <ShopItemList />
        <StyledNavLink $view="full" to="/shop">
          Go to shopping
        </StyledNavLink>
      </StyledMainPageBlock>
      <StyledTitle>
        <h2 className="title_middle">
          Make sure you haven&apos;t forgotten <Emphasis>anything</Emphasis>
        </h2>
        <h3 className="title_small">
          Go through the checklist before you leave
        </h3>
      </StyledTitle>
      <StyledMainPageBlock />
    </StyledMainCentredColumn>
  );
}

export default MainPage;
