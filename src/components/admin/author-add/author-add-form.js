import React, { useEffect, useRef, useState } from "react";

import { Form, Button, Spinner, Row, Col, ButtonGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { toast } from "../../../utils/functions/swal";
import "./author-add.scss";
import { createAuthor, getAllAuthors } from "../../../api/author-service";

const AuthorAddForm = () => {
  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const [initialValues] = useState({
    name: "",
    builtIn: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too short")
      .max(80, "Too Long")
      .required("Please enter name of author"),

    builtIn: Yup.bool().required("Please select"),
  });

  const onSubmit = async (values) => {
    setSaving(true);

    try {
      const payload = { ...values };

      await createAuthor(payload);
      toast("Author was saved", "success");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="px-2">
      <Row>
        <Col xl={9}>
          <Form.Group as={Col} md={4} lg={3} className="mb-3">
            <Form.Label>Name of Author</Form.Label>
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
            <Form.Label>Built-In</Form.Label>

            <Form.Select
              {...formik.getFieldProps("builtIn")}
              isInvalid={formik.touched.builtIn && formik.errors.builtIn}
              isValid={formik.touched.builtIn && !formik.errors.builtIn}
            >
              <option value={true}>Built-In</option>
              <option value={false}>Not-Built-In</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.builtIn}
            </Form.Control.Feedback>
          </Form.Group>
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
export default AuthorAddForm;
