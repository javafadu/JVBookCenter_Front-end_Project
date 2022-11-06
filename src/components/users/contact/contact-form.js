import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Spacer from "../../general/spacer/spacer";
import SectionTitle from "../../general/section-title/section-title";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./contact-form.scss";
import { toast } from "../../../utils/functions/swal";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    subject: "",
    body: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Enter your name"),
    subject: Yup.string()
      .max(50, "Your subject should be max 50 characters")
      .min(5, "Your subject should be at least 5 characters")
      .required("Enter subject of message"),
    body: Yup.string()
      .max(200, "Your subject should be max 200 characters")
      .min(20, "Your message should be at least 20 characters")
      .required("Enter your message"),
    email: Yup.string().email().required("Enter your email"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container className="contact-form mx-2 px-4">
      <Row className="g-1">
        <Col md={12}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("name")}
                isInvalid={formik.errors.name && formik.touched.name}
                isValid={!formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.errors.email && formik.touched.email}
                isValid={!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("subject")}
                isInvalid={formik.errors.subject && formik.touched.subject}
                isValid={!formik.errors.subject}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.subject}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                maxLength={200}
                {...formik.getFieldProps("body")}
                isInvalid={formik.errors.body && formik.touched.body}
                isValid={!formik.errors.body}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.body}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={!(formik.dirty && formik.isValid) || loading}
            >
              {loading && <Spinner animation="border" size="sm" />} Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
