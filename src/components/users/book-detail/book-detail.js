import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getBookWithId } from "../../../api/book-service";
import SectionTitle from "../../general/section-title/section-title";
import "./book-detail.scss";

const BookDetail = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get("id");

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});
  const [imgLink, setImgLink] = useState("");

  const loadData = async () => {
    try {
      const resp = await getBookWithId(bookId);
      setBook(resp.data);
      setImgLink(`../../../${resp.data?.imageLink}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container-fluid py-2">
        <div className="container py-2">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-1">
                <div className="section-title position-relative mb-5">
                  <h1 className="display-4">
                    <SectionTitle title={book.name} />
                  </h1>
                  <h5>{book.bookAuthor?.name}</h5>
                </div>

                <div className="book-image-container">
                  <img
                    src={
                      book.imageLink
                        ? require(`../../../${book?.imageLink}`)
                        : ""
                    }
                    alt={book.name}
                    className="book-image img-fluid"
                  />
                </div>
              </div>
            </div>
            {console.log(book)}
            <div className="col-md-6 py-5  mt-lg-0">
              <div className="py-5"></div>
              <div className="book-information mb-5 py-5">
                <h3 className="text-white py-3 px-4 m-0">Book Information</h3>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Author</h6>
                  <h6 className="text-white my-3">{book.bookAuthor?.name}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Publisher</h6>
                  <h6 className="text-white my-3">
                    {book.bookPublisher?.name}
                  </h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">ISBN</h6>
                  <h6 className="text-white my-3">{book.isbn}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Page Count</h6>
                  <h6 className="text-white my-3">{book.pageCount}</h6>
                </div>
                <div className="d-flex justify-content-between border-bottom px-4">
                  <h6 className="text-white my-3">Publish Date</h6>
                  <h6 className="text-white my-3">{book.publishDate}</h6>
                </div>
                <div className="d-flex justify-content-between px-4">
                  <h6 className="text-white my-3">Category</h6>
                  <h6 className="text-white my-3">{book.bookCategory?.name}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;
