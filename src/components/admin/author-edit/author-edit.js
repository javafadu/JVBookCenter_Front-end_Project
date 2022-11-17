import React from "react";
import "./author-edit.scss";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";

import BreadCrumbAuthorEdit from "./breadcrumb-author-edit";
import AuthorEditForm from "./author-edit-form";
import AuthorBooks from "./author-books";

const AuthorEdit = () => {
  return (
    <>
      <div className="admin-book-edit-page">
        <SectionTitle title="Author Edit" />
        <BreadCrumbAuthorEdit />
        <Spacer height={10} />
        <AuthorEditForm />

        <Spacer height={20} />
        <AuthorBooks />
      </div>
    </>
  );
};

export default AuthorEdit;
