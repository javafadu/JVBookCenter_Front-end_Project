import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Alert,
  Container,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getBookWithId } from "../../../api/book-service";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactInputMask from "react-input-mask-next";

const BookEditForm = () => {
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
    <Container>
      <Row>
        <Col md={3}>
          <div>
            <img
              src={book.imageLink ? require(`../../../${book?.imageLink}`) : ""}
              alt={book.name}
              className="img-fluid"
            />
          </div>
          <div>
            <Button>Change Image</Button>
          </div>
        </Col>
        <Col md={9}>FORM</Col>
      </Row>
    </Container>
  );
};

export default BookEditForm;
