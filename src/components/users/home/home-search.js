import React from "react";

const HomeSearch = () => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid position-relative overlay-bottom mb-3">
        <div className="container text-center my-2 py-2">
          <h3 className="text-white display-3 mb-4">Search Book</h3>
          <div className="mx-auto mb-5 w-50">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-light my-0.8 mx-2"
                placeholder="Name or Author or ISBN or Publisher"
              />
              <div className="input-group-append">
                <button className="btn btn-primary px-3 px-lg-5">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSearch;
