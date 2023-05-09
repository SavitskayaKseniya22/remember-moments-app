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
import { AuthForm } from "./components/AuthForm";
import { checkLS } from "./utils";
import App from "./App";
import { GlobalStyle } from "./styledComponents/GlobalStyle";
import ErrorPage from "./pages/ErrorPage";
import { MainContent } from "./components/MainContent";
import { loginAction, regAction } from "./services/actions";

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
        <Route index element={<App />} />

        <Route path="auth">
          <Route
            index
            element={
              <MainContent>
                <Outlet />
              </MainContent>
            }
          />
          <Route
            path="login"
            element={<AuthForm type="login" />}
            action={loginAction}
          />
          <Route
            path="registration"
            element={<AuthForm type="registration" />}
            action={regAction}
          />
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
