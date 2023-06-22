import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetWeatherQuery } from "../../store/weatherSlice";
import { RootState } from "../../store/store";

function WeatherDescription() {
  const { geo } = useSelector((state: RootState) => state.persist.weather);
  const [skipGetWeather, setSkipGetWeather] = useState(true);
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
    setSkipGetWeather(false);
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
        <button type="button" onClick={refetch}>
          update
        </button>
      </div>
    )
  );
}

export default WeatherDescription;
