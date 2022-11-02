import React, { useEffect, useState } from "react";
import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { getAllAuthors } from "../../../api/author-service";
import { getAllCategories } from "../../../api/category-service";
import { getAllPublishers } from "../../../api/publisher-service";
import Loading from "../../general/loading/loading";
import "./cat-author-publisher.scss";

const CatAuthorPublisherFilter = () => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const resp = await getAllCategories();
      setCategories(resp.data.content);
      const resp2 = await getAllAuthors();
      setAuthors(resp2.data.content);
      const resp3 = await getAllPublishers();
      setPublishers(resp3.data.content);
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
    <Container className="lib-container my-2 py-2">
      <Row className="justify-content-center">
        <Col sm="auto">
          {loading ? (
            <Loading />
          ) : (
            <DropdownButton
              className="btn-primary px-2 py-1"
              id="dropdown-basic-button"
              title="Categories"
            >
              {categories.map((category, index) => {
                const catLink = `/library?cat=${category.id}&type=${category.name}`;
                return (
                  <Dropdown.Item href={catLink} key={index}>
                    {category.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          )}
        </Col>

        <Col sm="auto">
          {loading ? (
            <Loading />
          ) : (
            <DropdownButton
              className="btn-primary px-2 py-1 x"
              id="dropdown-basic-button"
              title="Authors"
            >
              {authors.map((author, index) => {
                const authorLink = `/library?author=${author.id}&type=${author.name}`;
                return (
                  <Dropdown.Item href={authorLink} key={index}>
                    {author.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          )}
        </Col>

        <Col sm="auto">
          {loading ? (
            <Loading />
          ) : (
            <DropdownButton
              className="btn-primary px-2 py-1"
              id="dropdown-basic-button"
              title="Publishers"
            >
              {publishers.map((publisher, index) => {
                const publisherLink = `/library?publisher=${publisher.id}&type=${publisher.name}`;
                return (
                  <Dropdown.Item href={publisherLink} key={index}>
                    {publisher.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          )}
        </Col>
      </Row>
      <br />
    </Container>
  );
};

export default CatAuthorPublisherFilter;
