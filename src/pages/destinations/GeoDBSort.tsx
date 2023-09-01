/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StyledForm } from "../../components/profile/forms/AuthForm";
import { useGetPlaceQuery } from "../../store/geoDB/geoDBApi";
import { RootState } from "../../store/store";
import { StyledLikeButton } from "../../styledComponents/SharedStyles";

const StyledGeoDBSortType = styled("select")`
  ${StyledLikeButton}
`;

function GeoDBSortType() {
  const { geoDBSearchQuery, geoDBOffset, geoDBSortType } = useSelector(
    (state: RootState) => state.persist.geoDB,
  );

  const { register, getValues } = useForm();

  const [skip, setSkip] = useState(true);

  const sortRef = useRef(geoDBSortType);

  useGetPlaceQuery(
    {
      offset: geoDBOffset,
      namePrefix: geoDBSearchQuery,
      sort: sortRef.current,
    },
    {
      skip,
    },
  );

  return (
    <StyledForm method="post" noValidate>
      <StyledGeoDBSortType
        $view="outline"
        {...register("sort", {
          onChange() {
            if (geoDBSearchQuery.length > 2) {
              sortRef.current = getValues("sort");
              setSkip(false);
            }
          },
        })}
      >
        <option value="name">Sort alphabetically: A-Z</option>
        <option value="-name">Sort alphabetically: Z-A</option>
        <option value="population">Sort by population: 1-10</option>
        <option value="-population">Sort by population: 10-1</option>
      </StyledGeoDBSortType>
    </StyledForm>
  );
}

export default GeoDBSortType;
