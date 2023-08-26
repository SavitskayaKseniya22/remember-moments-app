import React from "react";
import { StyledListOfItems } from "../../styledComponents/SharedStyles";
import PopularPlace from "./PopularPlace";
import placeImage from "../../assets/images/france-eiffel-tower-paris.jpg";

function PopularPlacesList() {
  return (
    <StyledListOfItems>
      <PopularPlace
        name="Paris"
        country="France"
        score="4.8"
        image={placeImage}
      />
      <PopularPlace
        name="Moscow"
        country="Russia"
        score="3.2"
        image={placeImage}
      />
      <PopularPlace
        name="Sofia"
        country="Bulgaria"
        score="2.5"
        image={placeImage}
      />
    </StyledListOfItems>
  );
}

export default PopularPlacesList;
