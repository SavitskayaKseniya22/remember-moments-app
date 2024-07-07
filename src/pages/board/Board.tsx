import React from "react";
import JourneyWidget from "./JourneyWidget";
import { StyledMainCentred } from "../../styledComponents/SharedStyles";
import JourneyPreviewList from "./journey/JourneyPreviewList";

export function Board() {
  return (
    <StyledMainCentred>
      <JourneyWidget />
      <JourneyPreviewList />
    </StyledMainCentred>
  );
}

export default Board;
