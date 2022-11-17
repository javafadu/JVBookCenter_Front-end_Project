import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import AuthorAddForm from "./author-add-form";
import BreadCrumbAuthorAdd from "./breadcrumb-author-add";

const AuthorAdd = () => {
  return (
    <>
      <div className="admin-book-edit-page">
        <SectionTitle title="Add Author" />
        <BreadCrumbAuthorAdd />
        <Spacer height={10} />
        <AuthorAddForm />
        <Spacer height={10} />
      </div>
    </>
  );
};

export default AuthorAdd;
