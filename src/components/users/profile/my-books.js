import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthLoanedBooks } from "../../../api/loan-service";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { formatDateLibrary } from "../../../utils/functions/date-time";
import Loading from "../../general/loading/loading";
import { CgCalendarDates } from "react-icons/cg";
import "./my-books.scss";

const MyBooks = () => {
  const [loans, setLoans] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadData = async (page) => {
    try {
      const resp = await getAuthLoanedBooks(page, 2);
      console.log(resp.data);

      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setLoans(content);
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
    loadData(0);
  }, []);

  return (
    <>
      <h2>My Books</h2>

      {loading ? (
        <Loading />
      ) : (
        <Container>
          {loans.map((loan, index) => (
            <Row>
              <Row className="mt-2">
                <Col md={1}>
                  <a href={`../book-detail/?id=${loan.book.id}`}>
                    <img
                      src={
                        loan.book.imageLink
                          ? require(`../../../${loan.book?.imageLink}`)
                          : ""
                      }
                      alt={loan.name}
                      className="img-fluid"
                    />
                  </a>
                </Col>
                <Col md={11}>
                  <Row>
                    <a href={`../book-detail/?id=${loan.book.id}`}>
                      <h2>{loan.book.name}</h2>
                    </a>
                  </Row>
                  <Row>
                    <Col md={5}>
                      Loan Date <CgCalendarDates />{" "}
                      <span className="loan-date">
                        {" "}
                        {formatDateLibrary(loan.loanDate)}
                      </span>
                    </Col>
                    <Col md={6}>
                      {loan.returnDate == null ? (
                        <>
                          <span>
                            Expire Date <CgCalendarDates />{" "}
                          </span>
                          <span className="expire-date">
                            {formatDateLibrary(loan.expireDate)}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            Return Date <CgCalendarDates />{" "}
                          </span>
                          <span className="return-date">
                            {formatDateLibrary(loan.returnDate)}
                          </span>
                        </>
                      )}
                    </Col>
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

export default MyBooks;
