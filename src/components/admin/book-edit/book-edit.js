import React from "react";
import "./book-edit.scss";
import SectionTitle from "../../general/section-title/section-title";
import BreadCrumbBookEdit from "./breadcrumb-book-edit";
import Spacer from "../../general/spacer/spacer";
import BookEditForm from "./book-edit-form";
import LoaningHistory from "./loaning-history";
import LoanForm from "./loan-form";

const BookEdit = () => {
  return (
    <>
      <div className="admin-book-edit-page">
        <SectionTitle title="Book Edit" />
        <BreadCrumbBookEdit />
        <Spacer height={10} />
        <BookEditForm />
        <Spacer height={10} />
        <LoanForm />
        <Spacer height={20} />
        <LoaningHistory />
      </div>
    </>
  );
};

export default BookEdit;
