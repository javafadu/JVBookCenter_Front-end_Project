import React from "react";
import CatAuthorPublisherFilter from "./cat-author-publisher-filter";

const SearchFilter = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid position-relative overlay-bottom">
        <div className="container text-center mt-2 py-2">
          <div className="mx-auto mb-5 w-50">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-light mx-2"
                placeholder="Name or Author or ISBN or Publisher"
              />
              <div className="input-group-append">
                <button className="btn btn-primary px-3 px-lg-5">Search</button>
              </div>
            </div>
          </div>
          <div>
            <CatAuthorPublisherFilter />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
