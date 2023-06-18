/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StyledInput } from "./AuthForm";
import { getCoordsForCity, getWeather } from "../services/apiService";
import { WeatherTypes } from "../interfaces";
import { StyledBasicButton } from "../styledComponents/StyledButton";
import {
  flexboxLineStyle,
  transparentStyle,
} from "../styledComponents/SharedStyles";
import { RootState } from "../store/store";
import { updateCity, updateWeather } from "../store/weatherSlice";

export const StyledWeather = styled("div")`
  ${flexboxLineStyle}
  gap: 1rem;

  div {
    ${flexboxLineStyle}
    gap: 0.5rem;
  }
`;

export const StyledTransparentInput = styled(StyledInput)`
  ${transparentStyle}
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const StyledTransparentButton = styled(StyledBasicButton)`
  ${transparentStyle}
  border-bottom: 1px solid rgba(0, 0, 0, 0);
`;

export function Weather() {
  const { city, description } = useSelector(
    (state: RootState) => state.weather,
  );

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const { cityName } = data;
    const cityObjects = await getCoordsForCity(cityName);
    if (cityObjects.length) {
      const weatherResponse: WeatherTypes = await getWeather(
        cityObjects[0].lat,
        cityObjects[0].lon,
      );
      dispatch(updateCity(weatherResponse.name));
      dispatch(updateWeather(weatherResponse));
      setIsEditing(false);
    }
  });

  return (
    <StyledWeather>
      <Form
        method="get"
        onSubmit={onSubmit}
        onBlur={() => {
          setIsEditing(false);
        }}
      >
        {isEditing || !(city && description) ? (
          <StyledTransparentInput
            type="text"
            placeholder="city"
            defaultValue={city}
            {...register("cityName")}
          />
        ) : (
          <StyledTransparentButton
            type="button"
            handleClick={() => {
              setIsEditing(true);
            }}
          >
            {city}
          </StyledTransparentButton>
        )}
      </Form>
      {description && (
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${description?.weather[0].icon}.png`}
            alt="weather icon"
            title={`${description?.weather[0].description}`}
          />
          {description?.main.temp}&deg;
        </div>
      )}
    </StyledWeather>
  );
}

export default Weather;
