import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyle } from "./styledComponents/GlobalStyle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element="<div>main</div>" />
          <Route path="/login" element="<div>login</div>" />
          <Route path="/settings" element="<div>Settings</div>" />
          <Route path="/*" element="<div>404</div>" />
        </Routes>
        <Footer />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
