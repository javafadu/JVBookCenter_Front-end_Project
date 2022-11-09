import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./books.scss";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  let navigate = useNavigate();
  const handleSubmit = () => {
    let path = `/admin/books?q=${input}`;
    navigate(path);
    window.location.reload();
  };

  const handleSubmitBookAdd = () => {
    let path = `/admin/book-add`;
    navigate(path);
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
        <div>
          <button
            disabled={isButtonDisabled}
            type="submit"
            value="Submit"
            className="btn btn-info my-2 mx-0"
            onClick={handleSubmit}
          >
            <BsSearch />
          </button>
          <button
            type="submit"
            value="Submit"
            className="btn btn-primary my-2  mx-3"
            onClick={handleSubmitBookAdd}
          >
            Add New Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
