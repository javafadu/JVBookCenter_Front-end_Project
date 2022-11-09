import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import Spacer from "../../general/spacer/spacer";
import BookAddForm from "./book-add-form";
import BreadCrumbBookAdd from "./breadcrumb-book-add";

const BookAdd = () => {
  return (
    <>
      <div className="admin-book-edit-page">
        <SectionTitle title="Add Book" />
        <BreadCrumbBookAdd />
        <Spacer height={10} />
        <BookAddForm />
      </div>
    </>
  );
};

export default BookAdd;
