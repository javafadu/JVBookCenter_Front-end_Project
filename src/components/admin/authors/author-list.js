import React, { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Loading from "../../general/loading/loading";
import { CgCalendarDates } from "react-icons/cg";
import { getFilteredAuthors } from "../../../api/author-service";
import { formatDateLibrary } from "../../../utils/functions/date-time";
import "./authors.scss";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  let searchQ = "";

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  if (params.get("q") != null) {
    searchQ = params.get("q");
  }

  const loadData = async (page) => {
    try {
      const resp = await getFilteredAuthors(page, 10, "name", "ASC", searchQ);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setAuthors(content);

      if (numberOfElements === 0 && searchQ.length > 0)
        setResult("No results for: " + searchQ);

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
          <h2>{result}</h2>
          {searchQ.length > 1 &&
            authors.map((author, index) => (
              <Row key={index}>
                <Row>
                  <Col>
                    <a
                      href={`./author-edit/?id=${author.id}&authorName=${author.name}`}
                    >
                      <h2>{author.name}</h2>
                    </a>
                  </Col>
                  <Col>{author.builtIn ? "Built-In" : "Not Built-In"}</Col>
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

export default AuthorList;
