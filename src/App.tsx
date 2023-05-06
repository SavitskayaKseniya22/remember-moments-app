import React from "react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyle } from "./styledComponents/GlobalStyle";

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
            <Route path="/login" element="<div>login</div>" />
            <Route path="/settings" element="<div>Settings</div>" />
            <Route path="/*" element="<div>404</div>" />
          </Route>
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
