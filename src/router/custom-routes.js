import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/general/scroll-to-top/scroll-to-top";
import ContactPage from "../pages/users/contact-page";
import HomePage from "../pages/users/home-page";
import LibraryPage from "../pages/users/library-page";
import UserTemplate from "../templates/user-template";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>
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
          <Route path="library" element={<UserTemplate><LibraryPage/></UserTemplate>} />
          <Route path="contact" element={<UserTemplate><ContactPage/></UserTemplate>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
