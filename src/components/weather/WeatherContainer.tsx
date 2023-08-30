/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MatchedCities from "./MatchedCities";
import WeatherDescription from "./WeatherDescription";
import WeatherSearch from "./WeatherSearch";

export const StyledWeather = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export function WeatherContainer() {
  const { geo } = useSelector((state: RootState) => state.persist.weather);
  const [cityTitle, setCityTitle] = useState(geo?.name);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);

  return (
    <StyledWeather>
      <WeatherSearch
        setCityTitle={setCityTitle}
        setIsSubmitSuccessful={setIsSubmitSuccessful}
      />
      <MatchedCities
        cityTitle={cityTitle}
        isSubmitSuccessful={isSubmitSuccessful}
      />
      <WeatherDescription />
    </StyledWeather>
  );
}

export default WeatherContainer;
