import React from "react";
import FeaturedBooks from "../../components/users/home/featured-books";
import HomeSearch from "../../components/users/home/home-search";

const HomePage = () => {
  return (
    <>
      <HomeSearch />
      <FeaturedBooks />
    </>
  );
};

export default HomePage;
