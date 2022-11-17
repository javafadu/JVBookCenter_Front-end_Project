import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import BreadCrumb from "./breadcrumb";
import "./categories.scss";
import CategoryList from "./category-list";
import CategorySearchBar from "./category-searchbar";

const Categories = () => {
  return (
    <>
      <div className="admin-publishers-page">
        <SectionTitle title="Categories" />
        <BreadCrumb />
        <Spacer height={10} />
        <CategorySearchBar />
        <Spacer height={10} />
        <CategoryList />
      </div>
    </>
  );
};

export default Categories;
