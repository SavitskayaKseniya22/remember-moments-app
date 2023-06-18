import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import weatherReducer from "./weatherSlice";

const persistConfig = {
  key: "remember-moments-app-root",
  storage,
};

const rootReducer = combineReducers({
  weather: weatherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
