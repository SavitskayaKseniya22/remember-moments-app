import React from "react";
import {
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import ErrorPage from "../pages/ErrorPage";
import { MainPage } from "../pages/MainPage";
import { AuthForm } from "./AuthForm";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Board } from "./Board";
import { Settings } from "./Settings";
import { RootState } from "../store/store";
import { Profile } from "./Profile";
import Main from "./Main";

function PrivateRoute() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  return !activeUser ? <Navigate to="/" /> : <Outlet />;
}

function PrivateAuthRoute() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  return activeUser ? <Navigate to="/board" /> : <Outlet />;
}

function PrivateProfileRoute() {
  const { activeUser } = useSelector((state: RootState) => state.persist.user);
  return !activeUser ? <Navigate to="/auth/login" /> : <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <>
          <Header />
          <Main>
            <Outlet />
          </Main>

          <Footer />
        </>
      }
    >
      <Route
        path="/"
        errorElement={<ErrorPage />}
        id="root"
        element={<Outlet />}
      >
        <Route index element={<MainPage />} />
        <Route element={<PrivateAuthRoute />}>
          <Route path="auth" element={<Outlet />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<AuthForm formType="login" />} />
            <Route
              path="registration"
              element={<AuthForm formType="registration" />}
            />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="board" element={<Board />} />
        </Route>
        <Route element={<PrivateProfileRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="*" element="<div>404</div>" />
      </Route>
    </Route>,
  ),
);

export default router;
