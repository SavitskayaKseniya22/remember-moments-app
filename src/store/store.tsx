import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import weatherReducer, { weatherApi } from "./weatherSlice";
import settingsReducer from "./settingsSlice";
import userReducer, { authApi } from "./authSlice";

const persistConfig = {
  key: "remember-moments-app-root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    weather: weatherReducer,
    settings: settingsReducer,
    user: userReducer,
  }),
);

const rootReducer = combineReducers({
  persist: persistedReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(weatherApi.middleware)
      .concat(authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
