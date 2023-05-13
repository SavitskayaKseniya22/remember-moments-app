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
  signoutLoader,
  userLoader,
} from "../services/loaders";
import { AuthForm } from "./AuthForm";
import { Footer } from "./Footer";
import { Header } from "./Header";

import { Board } from "./Board";

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
      <Route
        path="/"
        errorElement={<ErrorPage />}
        loader={userLoader}
        id="root"
        element={<Outlet />}
      >
        <Route
          index
          element={<MainPage />}
          loader={boardLoaderWithActiveUser}
        />

        <Route
          path="auth"
          element={<Outlet />}
          loader={boardLoaderWithActiveUser}
        >
          <Route index element={<Navigate to="login" />} />
          <Route
            path="login"
            element={<AuthForm type="login" />}
            action={loginAction}
          />
          <Route path="logout" loader={signoutLoader} />
          <Route
            path="registration"
            element={<AuthForm type="registration" />}
            action={regAction}
          />
        </Route>

        <Route
          path="board"
          element={<Board />}
          loader={boardLoaderWithoutActiveUser}
        />
        <Route path="settings" element="<div>Settings</div>" />
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>,
  ),
);

export default router;
