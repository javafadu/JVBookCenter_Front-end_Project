import React from "react";
import BookCards from "../../components/users/library/book-cards";
import SearchFilter from "../../components/users/library/search-filter";

const LibraryPage = () => {
  return (
    <>
      <SearchFilter />
      <BookCards />
    </>
  );
};

export default LibraryPage;
