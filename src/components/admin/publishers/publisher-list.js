import React, { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Loading from "../../general/loading/loading";

import "./publishers.scss";
import { getFilteredPublishers } from "../../../api/publisher-service";

let sortBy = "id";
let sortType = "DESC";

const PublisherList = () => {
  const [publishers, setPublishers] = useState([]);
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
      if (params.get("q") != null) {
        searchQ = params.get("q");
        sortBy = "name";
        sortType = "ASC";
      }

      const resp = await getFilteredPublishers(
        page,
        10,
        sortBy,
        sortType,
        searchQ
      );

      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setPublishers(content);

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
      setResult(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className="list-container">
          <h2>{result}</h2>
          {publishers.map((publisher, index) => (
            <Row key={index}>
              <Row>
                <Col>
                  <a
                    href={`./publisher-edit/?id=${publisher.id}&authorName=${publisher.name}`}
                  >
                    <h2>{publisher.name}</h2>
                  </a>
                </Col>
                <Col>{publisher.builtIn ? "Built-In" : "Not Built-In"}</Col>
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

export default PublisherList;
