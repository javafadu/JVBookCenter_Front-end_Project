import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/general/scroll-to-top/scroll-to-top";
import HomePage from "../pages/users/home-page";
import UserTemplate from "../templates/user-template";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <UserTemplate>
                <HomePage />
              </UserTemplate>
            }
          />
          <Route path="about" element={<UserTemplate></UserTemplate>} />
          <Route path="contact" element={<UserTemplate></UserTemplate>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
