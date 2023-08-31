import React from "react";
import { StyledMainCentredColumn } from "../../styledComponents/SharedStyles";
import GeoDBPagination from "./GeoDBPagination";
import GeoDBSearchResults from "./GeoDBSearchResults";
import GeoDBSuggest from "./GeoDBSuggest";

function Destinations() {
  return (
    <StyledMainCentredColumn>
      <GeoDBSuggest />
      <GeoDBSearchResults />
      <GeoDBPagination />
    </StyledMainCentredColumn>
  );
}

export default Destinations;
