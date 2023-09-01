import React from "react";
import styled from "styled-components";
import { styledCentredFlexbox } from "../../styledComponents/SharedStyles";
import PopularPlace from "./PopularPlace";
import placeImage from "../../assets/images/france-eiffel-tower-paris.jpg";
import { GeoDataTypes } from "../../interfaces";

export const StyledPopularPlacesList = styled("ul")`
  ${styledCentredFlexbox}
  gap: 1rem;
  padding: 2rem;
  flex-wrap: wrap;
  width: 100%;
  flex-grow: 22;
  background-color: rgb(245, 249, 255);
`;

function PopularPlacesList({ result }: { result: GeoDataTypes }) {
  return (
    <StyledPopularPlacesList>
      {result &&
        result.data.map((item) => {
          const { countryCode, regionCode, id, name, region, country } = item;
          return (
            <PopularPlace
              key={`${countryCode}-${regionCode}-${id}`}
              name={name}
              region={region}
              country={country}
              score="4.8"
              image={placeImage}
            />
          );
        })}
    </StyledPopularPlacesList>
  );
}

export default PopularPlacesList;
