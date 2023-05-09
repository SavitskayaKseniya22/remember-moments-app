import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthForm } from "./components/AuthForm";

import App from "./App";
import { GlobalStyle } from "./styledComponents/GlobalStyle";
import ErrorPage from "./pages/ErrorPage";
import { MainContent } from "./components/MainContent";
import { loginAction, regAction } from "./services/actions";
import {
  boardLoaderWithActiveUser,
  boardLoaderWithoutActiveUser,
} from "./services/loaders";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <MainContent>
            <Outlet />
          </MainContent>
          <Footer />
        </>
      }
    >
      <Route path="/" errorElement={<ErrorPage />}>
        <Route index element={<App />} loader={boardLoaderWithActiveUser} />

        <Route path="auth">
          <Route
            index
            loader={boardLoaderWithActiveUser}
            element={<Navigate to="login" />}
          />
          <Route
            path="login"
            element={<AuthForm type="login" />}
            action={loginAction}
            loader={boardLoaderWithActiveUser}
          />
          <Route
            path="registration"
            element={<AuthForm type="registration" />}
            action={regAction}
            loader={boardLoaderWithActiveUser}
          />
        </Route>

        <Route
          path="board"
          element={<div>Board</div>}
          loader={boardLoaderWithoutActiveUser}
        />
        <Route path="settings" element="<div>Settings</div>" />
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>,
  ),
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <GlobalStyle />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
