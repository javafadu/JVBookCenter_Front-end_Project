import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import PublisherAddForm from "./publisher-add-form";
import BreadCrumbPublisherAdd from "./breadcrumb-publisher-add";

const PublisherAdd = () => {
  return (
    <>
      <div className="admin-publisher-edit-page">
        <SectionTitle title="Add Publisher" />
        <BreadCrumbPublisherAdd />
        <Spacer height={10} />
        <PublisherAddForm />
        <Spacer height={10} />
      </div>
    </>
  );
};

export default PublisherAdd;
