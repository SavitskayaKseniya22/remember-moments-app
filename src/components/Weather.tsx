/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { StyledInput } from "./AuthForm";
import { getCoordsForCity, getWeather } from "../services/apiService";
import { GeoTypes, WeatherTypes } from "../interfaces";
import { StyledBasicButton } from "../styledComponents/StyledButton";
import {
  flexboxLineStyle,
  transparentStyle,
} from "../styledComponents/SharedStyles";
import { RootState } from "../store/store";
import { updateGeo, updateWeather } from "../store/weatherSlice";

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
  const { geo, description } = useSelector((state: RootState) => state.weather);

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cityObjects, setCityObjects] = useState<GeoTypes[] | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = handleSubmit(async (data) => {
    const { cityName } = data;

    const cityObjectsResponse = await getCoordsForCity(cityName);
    setCityObjects(cityObjectsResponse);
    if (cityObjectsResponse.length === 1) {
      const weatherResponse: WeatherTypes = await getWeather(
        cityObjectsResponse[0].lat,
        cityObjectsResponse[0].lon,
      );
      dispatch(updateGeo(cityObjectsResponse[0]));
      dispatch(updateWeather(weatherResponse));
      setIsEditing(false);
      setCityObjects(undefined);
    }
  });

  return (
    <StyledWeather>
      <Form
        method="get"
        onSubmit={onSubmit}
        onBlur={() => {
          setIsEditing(false);
          clearErrors();
        }}
      >
        {isEditing || !geo ? (
          <StyledTransparentInput
            type="text"
            placeholder="city"
            defaultValue={geo?.name}
            {...register("cityName", {
              required: {
                value: true,
                message: "This is required",
              },
              pattern: {
                value: /[A-Za-z]+/,
                message: "Name must contain only letters",
              },
              minLength: {
                value: 3,
                message: "Name is too short",
              },
            })}
          />
        ) : (
          <StyledTransparentButton
            type="button"
            handleClick={() => {
              setIsEditing(true);
            }}
          >
            {`${geo?.name}, ${geo?.state}, ${geo?.country}`}
          </StyledTransparentButton>
        )}
      </Form>
      <ErrorMessage errors={errors} name="cityName" />
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
      {cityObjects &&
        cityObjects.map((elem) => (
          <button
            type="button"
            onClick={async () => {
              const weatherResponse: WeatherTypes = await getWeather(
                elem.lat,
                elem.lon,
              );
              dispatch(updateGeo(elem));
              dispatch(updateWeather(weatherResponse));
              setIsEditing(false);
              setCityObjects(undefined);
            }}
            key={elem.lat}
          >
            {`${elem.state ? `${elem.state},` : ""} ${elem.country}`}
          </button>
        ))}
    </StyledWeather>
  );
}

export default Weather;
