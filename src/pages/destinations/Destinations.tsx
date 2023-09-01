import React from "react";
import { useSelector } from "react-redux";
import { StyledMainCentredColumn } from "../../styledComponents/SharedStyles";
import GeoDBPagination from "./GeoDBPagination";
import GeoDBSuggest from "./GeoDBSuggest";
import { RootState } from "../../store/store";
import PopularPlacesList from "../mainPage/PopularPlacesList";
import GeoDBSortType from "./GeoDBSort";

function Destinations() {
  const { geoDBSearchResult } = useSelector(
    (state: RootState) => state.persist.geoDB,
  );
  return (
    <StyledMainCentredColumn>
      <GeoDBSuggest />
      <GeoDBSortType />
      {geoDBSearchResult && <PopularPlacesList result={geoDBSearchResult} />}
      <GeoDBPagination />
    </StyledMainCentredColumn>
  );
}

export default Destinations;
