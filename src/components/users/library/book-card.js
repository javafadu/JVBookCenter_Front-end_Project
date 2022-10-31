import React from "react";

const BookCard = (props) => {
  return (
    <div className="col-lg-3 col-md-6 pb-4">
      <a
        className="courses-list-item position-relative d-block overflow-hidden mb-2"
        href="detail.html"
      >
        <img
          className="img-fluid"
          src={require(`../../../${props.imageLink}`)}
          alt="book_image"
        />
        <div className="courses-text">
          <h4 className="text-center text-white px-3">{props.name}</h4>
          <div className="border-top w-100 mt-3">
            <div className="d-flex justify-content-between p-4">
              <span className="text-white">
                <i className="fa fa-user mr-2"></i>
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
