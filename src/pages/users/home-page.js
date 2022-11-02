import React from "react";
import SectionTitle from "../../components/general/section-title/section-title";
import FeaturedBooks from "../../components/users/home/featured-books";
import HomeSearch from "../../components/users/home/home-search";

const HomePage = () => {
  return (
    <>
      <HomeSearch />
      <SectionTitle title="Featured Books"/>
      <FeaturedBooks />
    </>
  );
};

export default HomePage;
