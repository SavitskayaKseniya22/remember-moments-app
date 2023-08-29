export interface TimeTypes {
  hours: number;
  minutes: number;
  seconds: number;
  [key: string]: number;
}

export interface AuthErrorTypes {
  error: {
    errors: [
      {
        domain: string;
        reason: string;
        message: string;
      },
    ];
    code: number;
    message: string;
  };
}
export interface WeatherErrorTypes {
  error: { cod: string; message: string };
}

export interface ActiveUserDataTypes {
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
  initialEmail: string;
}

export interface ActiveUserListDataTypes {
  kind: string;
  users: ActiveUserDataTypes[];
}

export interface ActiveUserTypes {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
  profilePicture: string;
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

export interface SignInUpArgsTypes {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ChangePasswordArgsTypes {
  idToken: string;
  password: string;
  returnSecureToken: boolean;
}

export interface ChangeEmailArgsTypes {
  idToken: string;
  email: string;
  returnSecureToken: boolean;
}

export interface UpdateProfileArgsTypes {
  idToken: string;
  displayName?: string;
  photoUrl?: string;
}
