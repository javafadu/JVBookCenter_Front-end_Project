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

const BookAddForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");

  const fileImageRef = useRef();

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [imageFileName, setImageFileName] = useState("");

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

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };
  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    setImageFileName(fileImageRef.current.files[0].name);
    if (!file) return;

    formik.setFieldValue("image", file);
    //formik state ini manuel olarak set ettik.Seçilen dosyayı image alanına yerleştirdik.

    const reader = new FileReader(); //Seçilen görüntüyü ekrana yerleştirdik
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  };

  const initialValues = {
    name: "",
    isbn: "",
    address: "",
    phone: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too short")
      .max(80, "Too Long")
      .required("Please enter name of book"),
    isbn: Yup.string()
      .required()
      .test(
        "len",
        "Must be exactly 5 characters",
        (val) => val && val.toString().length === 17
      ),
    address: Yup.string()
      .min(10, "Too short")
      .max(100, "Too Long")
      .required("Please enter your address"),
    phone: Yup.string().required(),
    birthDate: Yup.string(),
    email: Yup.string()
      .min(10, "Too short")
      .max(100, "Too Long")
      .email()
      .required("Please enter your email"),
    password: Yup.string()
      .required("Please enter your password")
      .min(5, "Must be at least 5 characters")
      .max(15, "Must be max 15 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmPassword: Yup.string()
      .required("Please re-enter your password")
      .oneOf([Yup.ref("password")], "Password fields doesn't match"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await createBook(values);
      toast("The book is registered successfully!", "success");
      formik.resetForm();
    } catch (err) {
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

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
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
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("address")}
                isInvalid={formik.touched.address && formik.errors.address}
                isValid={formik.touched.address && !formik.errors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                as={InputMask}
                mask="999-999-9999"
                {...formik.getFieldProps("phone")}
                isInvalid={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                isValid={
                  formik.touched.phoneNumber && !formik.errors.phoneNumber
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Birth Date (YYYY-MM-DD)</Form.Label>
              <Form.Control
                type="text"
                as={InputMask}
                mask="9999-99-99"
                {...formik.getFieldProps("birthDate")}
                isInvalid={formik.touched.zipCode && formik.errors.zipCode}
                isValid={formik.touched.zipCode && !formik.errors.zipCode}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
                isValid={formik.touched.email && !formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
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
