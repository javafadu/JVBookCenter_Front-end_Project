import React from "react";
import loanable from "../../../assets/img/loanable-sm.png";
import notLoanable from "../../../assets/img/not-loanable-sm.png";
import { getBookImage } from "../../../utils/functions/book";

const BookCard = (props) => {
  return (
    <div className="col-lg-3 col-md-6 pb-4">
      <a
        className="courses-list-item position-relative d-block overflow-hidden mb-2"
        href={`./book-detail/?id=${props.id}`}
      >
        <img
          src={getBookImage(props.image)}
          className="img-fluid rounded"
          alt={props.name}
        />
        <div className="loanable-status">
          {" "}
          {props.loanable ? (
            <img src={loanable} alt="" className="img-fluid" />
          ) : (
            <img src={notLoanable} alt="" className="img-fluid" />
          )}
        </div>
        <div className="courses-text">
          <h4 className="text-center text-white px-3"> {props.name}</h4>
          <div className="border-top w-100 mt-3">
            <div className="d-flex justify-content-between p-4">
              <span className="text-white">
                <i className="fa fa-user mr-2"></i>&nbsp;
                {props.bookAuthor.name}
              </span>
              <span className="text-white">
                <i className="fa fa-star mr-2"></i> {props.bookCategory.name}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BookCard;
