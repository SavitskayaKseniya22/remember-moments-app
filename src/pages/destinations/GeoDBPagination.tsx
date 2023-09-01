import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetPlaceQuery } from "../../store/geoDB/geoDBApi";
import { checkOffset } from "../../utils";
import {
  StyledBasicButton,
  StyledListOfItems,
} from "../../styledComponents/SharedStyles";

function Pagination() {
  const { geoDBSearchResult, geoDBSearchQuery, geoDBSortType, geoDBOffset } =
    useSelector((state: RootState) => state.persist.geoDB);

  const offsetRef = useRef(geoDBOffset);

  const [skip, setSkip] = useState(true);

  useGetPlaceQuery(
    {
      offset: offsetRef.current,
      namePrefix: geoDBSearchQuery,
      sort: geoDBSortType,
    },
    {
      skip,
    },
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {geoDBSearchResult && geoDBSearchResult.data.length > 0 && (
        <StyledListOfItems>
          {geoDBSearchResult?.links?.map((item) => {
            return (
              <li key={`${item.rel}-${item.href}`}>
                <StyledBasicButton
                  $view={
                    item.rel === "first" || item.rel === "last"
                      ? "full"
                      : "outline"
                  }
                  type="button"
                  onClick={() => {
                    const { currentOffset, totalCount } =
                      geoDBSearchResult.metadata;

                    const offset = checkOffset(
                      currentOffset,
                      totalCount,
                      item.rel,
                    ).toString();

                    if (geoDBOffset !== offset) {
                      offsetRef.current = offset;
                      setSkip(false);
                    }
                  }}
                >
                  {item.rel}
                </StyledBasicButton>
              </li>
            );
          })}
          <li>
            {geoDBSearchResult?.metadata?.currentOffset}-
            {(geoDBSearchResult?.metadata?.currentOffset || 0) +
              (geoDBSearchResult?.data?.length || 0)}
            /{geoDBSearchResult?.metadata.totalCount}
          </li>
        </StyledListOfItems>
      )}
    </>
  );
}

export default Pagination;
