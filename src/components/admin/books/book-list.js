import React, { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Loading from "../../general/loading/loading";
import { CgCalendarDates } from "react-icons/cg";
import { getFilteredBooks } from "../../../api/book-service";
import { formatDateLibrary } from "../../../utils/functions/date-time";
import "./books.scss";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  let searchQ = "";

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  if (params.get("q") != null) {
    searchQ = params.get("q");
  }

  const loadData = async (page) => {
    try {
      const resp = await getFilteredBooks(page, 5, "name", "ASC", searchQ);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setBooks(content);

      setPagination({
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchQ ? loadData(0) : setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className="book-list-container">
          {books.map((book, index) => (
            <Row>
              <Row key={index}>
                <Col md={1}>
                  <a href={`./book-edit/?id=${book.id}&bookName=${book.name}`}>
                    <img
                      src={
                        book.imageLink
                          ? require(`../../../${book?.imageLink}`)
                          : ""
                      }
                      alt={book.name}
                      className="img-fluid"
                    />
                  </a>
                </Col>

                <Col md={10}>
                  <Row>
                    <a
                      href={`./book-edit/?id=${book.id}&bookName=${book.name}`}
                    >
                      <h2>{book.name}</h2>
                    </a>
                  </Row>
                  <Row>
                    <Col>{book.bookAuthor.name}</Col>
                    <Col>{book.shelfCode}</Col>
                  </Row>
                  <Row>
                    <Col>{book.isbn}</Col>
                    <Col>{book.loanable ? "Available" : "Not-Avilable"}</Col>
                  </Row>
                </Col>
              </Row>
              <div>
                <hr />
              </div>
            </Row>
          ))}

          {pagination.totalPages > 1 && (
            <Row className="loans-pagination">
              <Pagination>
                <Pagination.First
                  onClick={() => loadData(0)}
                  disabled={pagination.pageable.pageNumber <= 0}
                />
                <Pagination.Prev
                  onClick={() => loadData(pagination.pageable.pageNumber - 1)}
                  disabled={pagination.pageable.pageNumber <= 0}
                />

                {[...Array(pagination.totalPages)].map((item, index) => (
                  <Pagination.Item
                    active={index === pagination.pageable.pageNumber}
                    key={index}
                    onClick={() => loadData(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => loadData(pagination.pageable.pageNumber + 1)}
                  disabled={
                    pagination.pageable.pageNumber >= pagination.totalPages - 1
                  }
                />
                <Pagination.Last
                  onClick={() => loadData(pagination.totalPages - 1)}
                  disabled={
                    pagination.pageable.pageNumber >= pagination.totalPages - 1
                  }
                />
              </Pagination>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default BookList;
