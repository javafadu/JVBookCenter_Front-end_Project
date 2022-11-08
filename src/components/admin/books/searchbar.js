import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./books.scss";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  let navigate = useNavigate();
  const handleSubmit = () => {
    let path = `/admin/books?q=${input}`;
    navigate(path);
    window.location.reload();
  };

  return (
    <div className="search-box">
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
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
