import React from "react";
import "./book-edit.scss";
import SectionTitle from "../../general/section-title/section-title";
import BreadCrumbBookEdit from "./breadcrumb-book-edit";
import Spacer from "../../general/spacer/spacer";
import BookEditForm from "./book-edit-form";
import LoaningHistory from "./loaning-history";

const BookEdit = () => {
  return (
    <>
      <div className="admin-book-edit-page">
        <SectionTitle title="Book Edit" />
        <BreadCrumbBookEdit />
        <Spacer height={10} />
        <BookEditForm />
        <Spacer height={10} />
        <div>
          <h2>Loaning History</h2>
        </div>
        <LoaningHistory />
      </div>
    </>
  );
};

export default BookEdit;
