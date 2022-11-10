import React from "react";
import Spacer from "../../general/spacer/spacer";
import BookList from "./book-list";
import BreadCrumb from "./breadcrumb";
import SearchBar from "./searchbar";
import "./books.scss";
import SectionTitle from "../../general/section-title/section-title";

const Books = () => {
  return (
    <>
      <div className="admin-books-page">
        <SectionTitle title="Books" />
        <BreadCrumb />
        <Spacer height={10} />
        <SearchBar />
        <Spacer height={10} />
        <BookList />
      </div>
    </>
  );
};

export default Books;