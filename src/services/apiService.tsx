import firebaseConfig from "./firebase";
import weatherApiKey from "./openweather";

async function signUp(data: {
  email: string;
  password: string;
  returnSecureToken: boolean;
}) {
  const key = firebaseConfig.apiKey;
  const response: Response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },
  );
  const result = await response.json();
  return result;
}

export default signUp;

export async function signIn(data: {
  email: string;
  password: string;
  returnSecureToken: boolean;
}) {
  const key = firebaseConfig.apiKey;
  const response: Response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    },
  );
  const result = await response.json();

  return result;
}

export async function getUserData(token: string) {
  const key = firebaseConfig.apiKey;
  const response: Response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ idToken: token }),
    },
  );
  const result = await response.json();

  return result;
}

export async function getCoordsForCity(cityName: string) {
  const key = weatherApiKey;
  const response: Response = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${key}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result = await response.json();
  return result;
}

export async function getWeather(lat: string, lon: string) {
  const key = weatherApiKey;
  const response: Response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result = await response.json();
  return result;
}
