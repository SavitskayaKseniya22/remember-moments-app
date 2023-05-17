/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { StyledInput } from "./AuthForm";
import { getCoordsForCity, getWeather } from "../services/apiService";
import { WeatherTypes } from "../interfaces";
import { StyledBasicButton } from "../styledComponents/StyledButton";
import {
  flexboxLineStyle,
  transparentStyle,
} from "../styledComponents/SharedStyles";

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
  const [name, setName] = useState<string | undefined>();
  const [weather, setWeather] = useState<WeatherTypes | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm();
  const storage = window.localStorage;

  const onSubmit = handleSubmit(async (data) => {
    const { cityName } = data;
    const cityObjects = await getCoordsForCity(cityName);
    if (cityObjects.length) {
      setName(cityName);
      const weatherResponse = await getWeather(
        cityObjects[0].lat,
        cityObjects[0].lon,
      );
      setWeather(weatherResponse);
    }
    setIsEditing(false);
  });

  useEffect(() => {
    const storedCityName = storage.getItem("cityName");
    const storedWeather = storage.getItem("cityWeather");
    if (storedCityName) {
      setName(storedCityName);
      setValue("cityName", storedCityName);
    }
    if (storedWeather) {
      setWeather(JSON.parse(storedWeather));
    }
  }, []);

  useEffect(() => {
    if (name) {
      storage.setItem("cityName", String(name));
    }
  }, [name]);

  useEffect(() => {
    if (weather) {
      storage.setItem("cityWeather", JSON.stringify(weather));
    }
  }, [weather]);

  return (
    <StyledWeather>
      <Form method="get" onSubmit={onSubmit}>
        {isEditing || !weather ? (
          <StyledTransparentInput
            type="text"
            placeholder="city"
            defaultValue={name}
            {...register("cityName")}
          />
        ) : (
          <StyledTransparentButton
            type="button"
            handleClick={() => {
              setIsEditing(true);
            }}
          >
            {name}
          </StyledTransparentButton>
        )}
      </Form>
      {weather && (
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
            alt="weather icon"
            title={`${weather?.weather[0].description}`}
          />
          {weather?.main.temp}&deg;
        </div>
      )}
    </StyledWeather>
  );
}

export default Weather;
