import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCards from "../library/book-cards";

const HomeSearch = () => {
  const [input, setInput] = useState("");

  let navigate = useNavigate();
  const handleSubmit = () => {
    let path = `/library?q=${input}`;
    navigate(path);
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid position-relative overlay-bottom mb-5">
        <div className="container text-center my-2 py-2">
          <h3 className="text-white display-3 mb-3">Search Book</h3>
          <div className="mx-auto mb-5 w-50">
            <div className="input-group">
              <input
                type="text"
                className="form-control border-light my-2 mx-2"
                placeholder="Name or Author or ISBN or Publisher"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  value="Submit"
                  className="btn btn-primary my-2 px-3 px-lg-5"
                  onClick={handleSubmit}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default HomeSearch;
