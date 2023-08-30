import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetWeatherQuery } from "../../store/weather/weatherApi";
import { StyledBasicButton } from "../../styledComponents/SharedStyles";

function WeatherDescription() {
  const { geo } = useSelector((state: RootState) => state.persist.weather);
  const [skipGetWeather, setSkipGetWeather] = useState(!geo);
  const { data, refetch } = useGetWeatherQuery(
    {
      lat: geo?.lat || 0,
      lon: geo?.lon || 0,
    },
    {
      skip: skipGetWeather,
    },
  );

  useEffect(() => {
    setSkipGetWeather(!geo);
  }, [geo]);

  return (
    data && (
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
          alt="weather icon"
          title={`${data?.weather[0].description}`}
        />
        {data?.main.temp}&deg;
        <StyledBasicButton $view="outline" type="button" onClick={refetch}>
          update
        </StyledBasicButton>
      </div>
    )
  );
}

export default WeatherDescription;
