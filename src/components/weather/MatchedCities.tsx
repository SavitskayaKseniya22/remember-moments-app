import React, { useState, useEffect } from "react";
import { GeoTypes } from "../../interfaces";
import { useAppDispatch } from "../../store/store";
import { useGetMatchedCitiesQuery } from "../../store/weather/weatherApi";
import { updateGeo } from "../../store/weather/weatherSlice";
import { StyledBasicButton } from "../../styledComponents/SharedStyles";

function MatchedCities({
  cityTitle,
  isSubmitSuccessful,
}: {
  cityTitle: string | undefined;
  isSubmitSuccessful: boolean;
}) {
  const [skipGetMatchedCities, setSkipGetMatchedCities] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data } = useGetMatchedCitiesQuery(cityTitle || "Moscow", {
    skip: skipGetMatchedCities,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSkipGetMatchedCities(false);
      setIsOpen(true);
    }
  }, [isSubmitSuccessful]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data &&
        data.length > 1 &&
        isOpen &&
        (data as GeoTypes[]).map((elem) => (
          <StyledBasicButton
            $view="outline"
            type="button"
            onClick={async () => {
              setIsOpen(false);
              dispatch(updateGeo(elem));
            }}
            key={elem.lat}
          >
            {`${elem?.name}, ${
              elem.state && elem?.state !== elem?.name ? `${elem.state},` : ""
            } ${elem.country}`}
          </StyledBasicButton>
        ))}
    </>
  );
}

export default MatchedCities;
