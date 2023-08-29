import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { AuthErrorTypes, GeoTypes } from "./interfaces";

export function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return { hours, minutes, seconds };
}

function formatNumber(number: number) {
  const string = `000000${String(number)}`;
  return string.slice(-2);
}

export function formatTime(time: { [key: string]: number }) {
  const formattedTime: { [key: string]: string } = {
    hours: "0",
    minutes: "0",
    seconds: "0",
  };

  Object.keys(time).forEach((item: string) => {
    formattedTime[item] = formatNumber(time[item]);
  });

  return formattedTime;
}

export function IsItDay() {
  const hours = new Date().getHours();
  return hours < 12;
}

export function filterData(data: GeoTypes[]) {
  const shortedData = data.map((elem) => {
    const copiedElem = Object.assign(elem);
    copiedElem.lat = elem.lat.toFixed(1);
    copiedElem.lon = elem.lon.toFixed(1);
    return copiedElem;
  });
  const filteredData: GeoTypes[] = [];
  shortedData.forEach((elem) => {
    const matches = filteredData.filter((item) => {
      return item.lon === elem.lon && item.lat === elem.lat;
    });
    if (matches.length === 0) {
      filteredData.push(elem);
    }
  });
  return filteredData;
}

export function transformAuthError(response: FetchBaseQueryError) {
  const { message } = (response.data as AuthErrorTypes).error;
  return {
    code: response.status,
    message: message.toLowerCase().replaceAll("_", " "),
  };
}
