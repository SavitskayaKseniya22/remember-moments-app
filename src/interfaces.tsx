export interface TimeTypes {
  hours: number;
  minutes: number;
  seconds: number;
  [key: string]: number;
}

export interface UserDataType {
  users: [
    {
      localId: string;
      email: string;
      emailVerified: boolean;
      displayName: string;
      providerUserInfo: [
        {
          providerId: string;
          displayName: string;
          photoUrl: string;
          federatedId: string;
          email: string;
          rawId: string;
          screenName: string;
        },
      ];
      photoUrl: string;
      passwordHash: string;
      passwordUpdatedAt: number;
      validSince: string;
      disabled: boolean;
      lastLoginAt: string;
      createdAt: string;
      customAuth: boolean;
    },
  ];
}

export interface UserTypes {
  activeUser: {
    email: string;
    token: string;
  };
  userData: UserDataType;
}

export interface GeoTypes {
  name: string;
  local_names: { [x: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface WeatherTypes {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
