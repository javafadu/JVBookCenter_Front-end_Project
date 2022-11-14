import React, { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask-next";
import {
  Form,
  Button,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Badge,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../api/book-service";
import { toast } from "../../../utils/functions/swal";
import "./book-add.scss";
import { getAllAuthors } from "../../../api/author-service";
import { getAllCategories } from "../../../api/category-service";
import { getAllPublishers } from "../../../api/publisher-service";
import { getCurrentYear } from "../../../utils/functions/date-time";

import axios from "axios";

const BookAddForm = () => {
  const [loading, setLoading] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const fileImageRef = useRef();
  const navigate = useNavigate();
  const [imageFileName, setImageFileName] = useState("");

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);

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

  const initialValues = {
    name: "",
    isbn: "",
    pageCount: "",
    bookAuthor: "",
    bookPublisher: "",
    bookCategory: "",
    shelfCode: "",
    featured: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too short")
      .max(80, "Too Long")
      .required("Please enter name of book"),
    isbn: Yup.string()
      .required()
      .matches(
        /([0-9][0-9][0-9][-][0-9][0-9][-][0-9][0-9][0-9][0-9][0-9][-][0-9][0-9][-][0-9]$)/,
        "Please enter a valid ISBN number"
      ),

    pageCount: Yup.number().positive().integer(),
    bookAuthor: Yup.number().positive().integer().required("Select an author"),
    bookPublisher: Yup.number()
      .positive()
      .integer()
      .required("Select a publisher"),

    bookCategory: Yup.number()
      .positive()
      .integer()
      .required("Select a category"),
    shelfCode: Yup.string()
      .required("Please enter name of book")
      .matches(
        /([A-Z][A-Z][-][0-9][0-9][0-9]$)/,
        "Please use Upper Case for first letters"
      ),
    featured: Yup.bool().required("Please select"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", values.image);
      formData.delete("file", fileImageRef.current.files[0]);
      formData.append("file", fileImageRef.current.files[0], imageFileName);

      const response = await axios({
        method: "post",
        url: "http://192.168.1.171/books/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const payload = { ...values };
      delete payload.image;

      payload.imageLink = imageFileName;
      const resp = await createBook(payload);
      toast("The book is registered successfully!", "success");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };
  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    var filename = `${Math.random().toString(32).slice(2)}${
      fileImageRef.current.files[0].name
    }`;

    setImageFileName(filename);
    if (!file) return;

    formik.setFieldValue("image", file);
    //formik state ini manuel olarak set ettik.Seçilen dosyayı image alanına yerleştirdik.

    const reader = new FileReader(); //Seçilen görüntüyü ekrana yerleştirdik
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  };

  const isError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="px-2">
      <Row>
        <Col xl={3} className="image-area">
          <Form.Control
            type="file"
            name="image"
            className="d-none"
            onChange={handleImageChange}
            ref={fileImageRef}
          />
          <img src={imageSrc} className="img-fluid" alt="..." />
          {formik.errors.image && (
            <Badge bg="danger" className="image-area-error">
              Please select an image
            </Badge>
          )}
          <Button
            variant={formik.errors.image ? "danger" : "primary"}
            onClick={handleSelectImage}
          >
            Select Image
          </Button>
        </Col>

        <Col xl={9}>
          <Row>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Name of Book</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("name")}
                isInvalid={formik.touched.name && formik.errors.name}
                isValid={formik.touched.name && !formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                as={InputMask}
                mask="999-99-99999-99-9"
                {...formik.getFieldProps("isbn")}
                isInvalid={formik.touched.isbn && formik.errors.isbn}
                isValid={formik.touched.isbn && !formik.errors.isbn}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.isbn}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Page Count</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("pageCount")}
                isInvalid={formik.touched.pageCount && formik.errors.pageCount}
                isValid={formik.touched.pageCount && !formik.errors.pageCount}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pageCount}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Publish Year</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("publishDate")}
                isInvalid={
                  formik.touched.publishDate && formik.errors.publishDate
                }
                isValid={
                  formik.touched.publishDate && !formik.errors.publishDate
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.publishDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Book Author</Form.Label>

              <Form.Control
                as="select"
                type="select"
                {...formik.getFieldProps("bookAuthor")}
                isInvalid={
                  formik.touched.bookAuthor && formik.errors.bookAuthor
                }
                isValid={formik.touched.bookAuthor && !formik.errors.bookAuthor}
              >
                <option value={0}>Select</option>

                {authors.map((author, index) => {
                  return (
                    <option value={author.id} key={index}>
                      {author.name}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.bookAuthor}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Book Publisher</Form.Label>

              <Form.Control
                as="select"
                type="select"
                {...formik.getFieldProps("bookPublisher")}
                isInvalid={
                  formik.touched.bookPublisher && formik.errors.bookPublisher
                }
                isValid={
                  formik.touched.bookPublisher && !formik.errors.bookPublisher
                }
              >
                <option value={0}>Select</option>

                {publishers.map((publisher, index) => {
                  return (
                    <option value={publisher.id} key={index}>
                      {publisher.name}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.bookPublisher}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Book Category</Form.Label>

              <Form.Control
                as="select"
                type="select"
                {...formik.getFieldProps("bookCategory")}
                isInvalid={
                  formik.touched.bookCategory && formik.errors.bookCategory
                }
                isValid={
                  formik.touched.bookCategory && !formik.errors.bookCategory
                }
              >
                <option value={0}>Select</option>

                {categories.map((category, index) => {
                  return (
                    <option value={category.id} key={index}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.bookCategory}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Shelf Code</Form.Label>
              <Form.Control
                type="text"
                as={InputMask}
                mask="aa-999"
                {...formik.getFieldProps("shelfCode")}
                isInvalid={formik.touched.shelfCode && formik.errors.shelfCode}
                isValid={formik.touched.shelfCode && !formik.errors.shelfCode}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.shelfCode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Featured</Form.Label>

              <Form.Control
                as="select"
                type="select"
                {...formik.getFieldProps("featured")}
                isInvalid={formik.touched.featured && formik.errors.featured}
                isValid={formik.touched.featured && !formik.errors.featured}
              >
                <option value={0}>Select</option>
                <option value={true}>Featured</option>
                <option value={false}>Not-Featured</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.featured}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Col>
      </Row>

      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner animation="border" size="sm" />} Create
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};
export default BookAddForm;
