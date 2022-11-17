import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import AuthorSearchBar from "./author-searchbar";
import BreadCrumb from "./breadcrumb";
import "./authors.scss";
import AuthorList from "./author-list";

const Authors = () => {
  return (
    <>
      <div className="admin-authors-page">
        <SectionTitle title="Authors" />
        <BreadCrumb />
        <Spacer height={10} />
        <AuthorSearchBar />
        <Spacer height={10} />
        <AuthorList/>
      </div>
    </>
  );
};

export default Authors;
