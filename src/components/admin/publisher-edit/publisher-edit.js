import React from "react";
import "./publisher-edit.scss";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";

import BreadCrumbAuthorEdit from "./breadcrumb-publisher-edit";
import PublisherEditForm from "./publisher-edit-form";
import PublisherBooks from "./publisher-books";

const PublisherEdit = () => {
  return (
    <>
      <div className="admin-publisher-edit-page">
        <SectionTitle title="Publisher Edit" />
        <BreadCrumbAuthorEdit />
        <Spacer height={10} />
        <PublisherEditForm />
        <Spacer height={20} />
        <PublisherBooks />
      </div>
    </>
  );
};

export default PublisherEdit;
