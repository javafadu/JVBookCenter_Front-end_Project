import React, { useEffect, useState } from "react";
import { getBooksByPage } from "../../../api/book-service";
import BookCard from "./book-card";
import { Pagination, Row } from "react-bootstrap";

const BookCards = () => {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadData = async (page) => {
    try {
      const resp = await getBooksByPage(page, 5);

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
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row mx-0 justify-content-center">
          <div className="col-lg-8"></div>
        </div>
        <div className="row">
          {books.map((book, index) => (
            <BookCard {...book} key={index} />
          ))}
        </div>

        <div>
          {pagination.totalPages > 1 && (
            <Row className="vehicles-pagination">
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
        </div>
      </div>
    </div>
  );
};

export default BookCards;
