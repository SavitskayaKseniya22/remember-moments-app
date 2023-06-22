import React, { useState, useEffect } from "react";
import { GeoTypes } from "../../interfaces";
import { useAppDispatch } from "../../store/store";
import { useGetMatchedCitiesQuery, updateGeo } from "../../store/weatherSlice";

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
  const { data, error } = useGetMatchedCitiesQuery(
    {
      cityName: cityTitle || "Moscow",
    },
    {
      skip: skipGetMatchedCities,
    },
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSkipGetMatchedCities(false);
      setIsOpen(true);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    if (data && data.length === 1) {
      setIsOpen(false);
      dispatch(updateGeo(data[0]));
    }
  }, [data, dispatch]);

  return (
    data &&
    isOpen &&
    (data as GeoTypes[]).map((elem) => (
      <button
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
      </button>
    ))
  );
}

export default MatchedCities;
