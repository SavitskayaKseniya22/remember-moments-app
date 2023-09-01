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
import { GeoDataTypes } from "../interfaces";

export const dummyData: GeoDataTypes = {
  data: [
    {
      id: 3710202,
      wikiDataId: "Q649",
      type: "CITY",
      name: "Moscow",
      country: "Russia",
      countryCode: "RU",
      region: "Moscow",
      regionCode: "MOW",
      regionWdId: "Q649",
      latitude: 55.755833333,
      longitude: 37.617777777,
      population: 13010112,
    },
    {
      id: 144571,
      wikiDataId: "Q90",
      type: "CITY",
      name: "Paris",
      country: "France",
      countryCode: "FR",
      region: "Île-de-France",
      regionCode: "IDF",
      regionWdId: "Q13917",
      latitude: 48.856666666,
      longitude: 2.352222222,
      population: 2145906,
    },
    {
      id: 7448,
      wikiDataId: "Q472",
      type: "CITY",
      name: "Sofia",
      country: "Bulgaria",
      countryCode: "BG",
      region: "Sofia City Province",
      regionCode: "22",
      regionWdId: "Q1585725",
      latitude: 42.697886,
      longitude: 23.321726,
      population: 1383435,
    },
  ],
  metadata: { currentOffset: 0, totalCount: 1 },
};

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
        <PopularPlacesList result={dummyData} />
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
