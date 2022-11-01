import React, { useState } from "react";
import CatAuthorPublisherFilter from "./cat-author-publisher-filter";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const [input, setInput] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  let navigate = useNavigate();
  const handleSubmit = () => {
    let path = `/library?q=${input}`;
    navigate(path);
    window.location.reload();
  };

  return (
    <>
      <div className="jumbotron jumbotron-fluid position-relative overlay-bottom">
        <div className="container text-center mt-2 pb-5 pt-2">
          <div className="mx-auto mb-3 w-50">
            <div className="input-group">
              <input
                type="text"
                maxLength={30}
                className="form-control border-light my-2 mx-2"
                placeholder="Name or Author or ISBN or Publisher"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);

                  if (input.length < 2) {
                    setIsButtonDisabled(true);
                  } else {
                    setIsButtonDisabled(false);
                  }
                }}
              />
              <div className="input-group-append">
                <button
                  disabled={isButtonDisabled}
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
          <div>
            <CatAuthorPublisherFilter />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
