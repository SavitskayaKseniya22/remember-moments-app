import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  Route,
  Outlet,
  redirect,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AuthPage } from "./pages/AuthPage";
import { checkLS } from "./utils";
import App from "./App";
import { GlobalStyle } from "./styledComponents/GlobalStyle";
import ErrorPage from "./pages/ErrorPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    >
      <Route path="/" errorElement={<ErrorPage />}>
        <Route index element={<App />} />

        <Route path="auth">
          <Route index element={<AuthPage type="login" />} />
          <Route path="login" element={<AuthPage type="login" />} />
          <Route path="registration" element={<AuthPage type="reg" />} />
        </Route>

        <Route
          path="board"
          element={<div>Board</div>}
          loader={() => {
            const user = checkLS("activeUser");
            if (!user) {
              return redirect("/");
            }
            return { user };
          }}
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
