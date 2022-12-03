import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useLocation, useSearchParams } from "react-router-dom";
import { getBookWithId } from "../../../api/book-service";
import SectionTitle from "../../general/section-title/section-title";
import "./book-detail.scss";
import SameCategoryBooks from "./same-category-books";
import { getBookImage } from "../../../utils/functions/book";

const BookDetail = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get("id");

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  const loadData = async () => {
    try {
      const resp = await getBookWithId(bookId);
      setBook(resp.data);
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
      <div className="section-title position-relative my-2 mb-5">
        <h1 className="display-4">
          <SectionTitle title={book.name} />
        </h1>
        <h5>{book.bookAuthor?.name}</h5>
      </div>

      <Container>
        <Row>
          <Col md={6} className="book-image-main">
            <div className="book-container">
              <div class="book">
              <img
                              src={getBookImage(book.image)}
                              className="img-fluid rounded"
                              alt={book.name}
                            />
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="book-information">
              <h3 className="text-primary py-4 px-4 m-0">Book Information</h3>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className=" my-3">Author</h6>
                <h6 className=" my-3">{book.bookAuthor?.name}</h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className=" my-3">Publisher</h6>
                <h6 className=" my-3">{book.bookPublisher?.name}</h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className=" my-3">ISBN</h6>
                <h6 className=" my-3">{book.isbn}</h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className=" my-3">Page Count</h6>
                <h6 className=" my-3">{book.pageCount}</h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className=" my-3">Publish Date</h6>
                <h6 className=" my-3">{book.publishDate}</h6>
              </div>
              <div className="d-flex justify-content-between px-4">
                <h6 className=" my-3">Category</h6>
                <h6 className=" my-3">{book.bookCategory?.name}</h6>
              </div>
            </div>

            <div
              className={`book-information ${
                book.loanable ? "available" : "not-available"
              }`}
            >
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className=" my-3">
                  {book.loanable ? "Available" : "Not Available"}
                </h6>

                <h6 className=" my-3">Shelf Code: {book.shelfCode}</h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="same-cat-books-title">
        <h3>Other Books in This Category</h3>
      </div>
      {loading ? (
        ""
      ) : (
        <SameCategoryBooks cat={book.bookCategory?.id} bookId={book.id} />
      )}
    </>
  );
};

export default BookDetail;
