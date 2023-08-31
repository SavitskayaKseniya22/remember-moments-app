import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store/store";

export const StyledTable = styled("table")`
  th {
    background-color: #fd6e09;
    border-radius: 0.5rem;
    color: white;
    padding: 0.5rem 3rem;
  }

  td {
    padding: 0.5rem;
  }

  tr {
    border-bottom: 2px solid #666666;
    &:nth-child(even) {
      background-color: rgb(245, 249, 255);
    }
  }
`;

function PlaceSearchResults() {
  const { geoDBSearchResult } = useSelector(
    (state: RootState) => state.persist.geoDB,
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {geoDBSearchResult && geoDBSearchResult.data.length > 0 && (
        <StyledTable>
          <thead>
            <tr>
              <th>Country</th>
              <th>Region</th>
              <th>Name</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {geoDBSearchResult.data.map((item) => {
              return (
                <tr key={`${item.countryCode}-${item.id}`}>
                  <td>{item.country}</td>
                  <td>{item.region}</td>
                  <td>{item.name}</td>
                  <td>{item.population}</td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      )}
    </>
  );
}

export default PlaceSearchResults;
