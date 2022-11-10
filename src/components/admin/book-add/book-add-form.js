import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  Badge,
  Spinner,
} from "react-bootstrap";
import "./book-add.scss";
import {
  createBook
} from "../../../api/book-service";
import { toast } from "../../../utils/functions/swal";
import { useNavigate } from "react-router-dom";
import { getCurrentYear } from "../../../utils/functions/date-time";

const BookAddForm = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const fileImageRef = useRef();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    isbn: "",
    pageCount: "",
    bookAuthor: "",
    bookPublisher: "",
    publishDate: "",
    bookCategory: "",
    imageLink: "",
    shelfCode: "",
    featured: "",
    image: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter a name"),
    isbn: Yup.string().required("Please enter the isbn number"),
    pageCount: Yup.number(),
    bookAuthor: Yup.number().required("Please select an author"),
    bookPublisher: Yup.number().required("Please select a publisher"),
    publishDate: (Yup.number().typeError("Must be number").max =
      getCurrentYear()),
    bookCategory: Yup.number().required("Please select a category"),
    imageLink: Yup.string(),
    shelfCode: Yup.string().required("Please enter the shelf code"),
    featured: Yup.boolean().oneOf([true], "Featured Book"),
    image: Yup.mixed(),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", values.image);



      const payload = { ...values };
      delete payload.image;

      await createBook(payload);
      toast("Book was registered", "successfully");
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
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("model")}
                className={isError("model") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.model}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Doors</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("doors")}
                className={isError("doors") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.doors}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("seats")}
                className={isError("seats") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.seats}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Luggage</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("luggage")}
                className={isError("luggage") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.luggage}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Transmission</Form.Label>
              <Form.Select
                {...formik.getFieldProps("transmission")}
                className={isError("transmission") && "is-invalid"}
              >
                <option>Select</option>
                <option value="Automatic">Automatic</option>
                <option value="Manuel">Manuel</option>
                <option value="Tiptronic">Tiptronic</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.transmission}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Air Conditioning</Form.Label>
              <Form.Select
                {...formik.getFieldProps("airConditioning")}
                className={isError("airConditioning") && "is-invalid"}
              >
                <option>Select</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.airConditioning}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Select
                {...formik.getFieldProps("fuelType")}
                className={isError("fuelType") && "is-invalid"}
              >
                <option>Select</option>
                <option value="Electricity">Electricity</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hydrogen">Hydrogen</option>
                <option value="LPG">LPG</option>
                <option value="CNG">CNG</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.fuelType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("age")}
                className={isError("age") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Price Per Hour</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("pricePerHour")}
                className={isError("pricePerHour") && "is-invalid"}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pricePerHour}
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

export default BookAddForm;;