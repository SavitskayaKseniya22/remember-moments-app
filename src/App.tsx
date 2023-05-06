import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyle } from "./styledComponents/GlobalStyle";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="auth">
              <Route path="login" element={<AuthPage type="login" />} />
              <Route path="registration" element={<AuthPage type="reg" />} />
            </Route>
            <Route path="board" element="<div>Board</div>" />
            <Route path="settings" element="<div>Settings</div>" />
            <Route path="*" element="<div>404</div>" />
          </Route>
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
