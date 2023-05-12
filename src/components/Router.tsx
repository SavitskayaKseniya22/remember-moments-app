import React from "react";
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import ErrorPage from "../pages/ErrorPage";
import { MainPage } from "../pages/MainPage";
import { loginAction, regAction } from "../services/actions";
import {
  boardLoaderWithActiveUser,
  boardLoaderWithoutActiveUser,
} from "../services/loaders";
import { AuthForm } from "./AuthForm";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MainContent } from "./MainContent";

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
        <Route
          index
          element={<MainPage />}
          loader={boardLoaderWithActiveUser}
        />

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

export default router;
