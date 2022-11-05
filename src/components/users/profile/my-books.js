import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthLoanedBooks } from "../../../api/loan-service";
import { Container, Row, Col, Pagination } from "react-bootstrap";
import { formatDateTimeToLLL } from "../../../utils/functions/date-time";
import Loading from "../../general/loading/loading";

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

      <Container>
        {loans.map((loan, index) => (
          <Row>
            <Col md={1}>
              <img
                src={
                  loan.book.imageLink
                    ? require(`../../../${loan.book?.imageLink}`)
                    : ""
                }
                alt={loan.name}
                className="img-fluid"
              />
            </Col>
            <Col md={11}>
              <Row>{loan.book.name}</Row>
              <Row>
                <Col md={5}>Loan Date : {loan.loanDate}</Col>
                <Col md={6}>
                  {loan.returnDate == null
                    ? `Expire Date: ${loan.expireDate}`
                    : `Return Date : ${loan.returnDate} `}
                </Col>
              </Row>
            </Col>
          </Row>
        ))}

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
      </Container>
    </>
  );
};

export default MyBooks;
