/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { StyledForm, StyledInput } from "./AuthForm";
import { getCoordsForCity, getWeather } from "../services/apiService";
import { WeatherTypes } from "../interfaces";

export const StyledWeather = styled("div")`
  background-color: white;
`;

export function Weather() {
  const [name, setName] = useState<string | undefined>();
  const [weather, setWeather] = useState<WeatherTypes | undefined>();
  const { register, handleSubmit, setValue } = useForm();
  const storage = window.localStorage;

  const onSubmit = handleSubmit(async (data) => {
    const { cityName } = data;
    console.log(cityName);
    const cityObjects = await getCoordsForCity(cityName);
    if (cityObjects.length) {
      setName(cityName);
      const weatherResponse = await getWeather(
        cityObjects[0].lat,
        cityObjects[0].lon,
      );
      setWeather(weatherResponse);
    }
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
      <StyledForm method="get" onSubmit={onSubmit}>
        <StyledInput
          type="text"
          placeholder="city"
          defaultValue={name}
          {...register("cityName")}
        />
      </StyledForm>

      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
        alt="weather icon"
      />
      <span> {weather?.weather[0].description}</span>
      <span>{weather?.main.temp}</span>
    </StyledWeather>
  );
}

export default Weather;
