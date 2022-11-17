import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import PublisherSearchBar from "./publisher-searchbar";
import BreadCrumb from "./breadcrumb";
import "./publishers.scss";
import PublisherList from "./publisher-list";

const Publishers = () => {
  return (
    <>
      <div className="admin-publishers-page">
        <SectionTitle title="Publishers" />
        <BreadCrumb />
        <Spacer height={10} />
        <PublisherSearchBar />
        <Spacer height={10} />
        <PublisherList />
      </div>
    </>
  );
};

export default Publishers;
