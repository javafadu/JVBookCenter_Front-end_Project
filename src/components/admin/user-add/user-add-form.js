import React, { useEffect, useRef, useState } from "react";

import { Form, Button, Spinner, Row, Col, ButtonGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask-next";
import { toast } from "../../../utils/functions/swal";
import "./user-add.scss";
import { createUser } from "../../../api/user-service";
import { useSelector } from "react-redux";
import PasswordInput from "../../general/password-input/password-input";

const UserAddForm = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  let access = true;

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const [initialValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    birthDate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Too short")
      .max(30, "Too Long")
      .required("Please enter your first name"),
    lastName: Yup.string()
      .min(3, "Too short")
      .max(30, "Too Long")
      .required("Please enter your last name"),
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
    setSaving(true);

    try {
      const payload = { ...values };
      delete payload.roles;

      const updatedRoles = [];

      const memberObje = {
        id: 3,
        name: "ROLE_MEMBER",
      };

      updatedRoles.push(memberObje);

      payload.roles = updatedRoles;

      await createUser(payload);
      toast("User was saved", "success");
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
      <fieldset disabled={!access}>
        <Row>
          <Form.Group as={Col} md={4} lg={3} className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("firstName")}
              isInvalid={formik.touched.firstName && formik.errors.firstName}
              isValid={formik.touched.firstName && !formik.errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={4} lg={3} className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("lastName")}
              isInvalid={formik.touched.lastName && formik.errors.lastName}
              isValid={formik.touched.lastName && !formik.errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.lastName}
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
              isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
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

          <Form.Group as={Col} md={4} lg={3} className="mb-3">
            <Form.Label>Password</Form.Label>
            <PasswordInput
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && formik.errors.password}
              isValid={formik.touched.password && !formik.errors.password}
              error={formik.errors.password}
            />
          </Form.Group>
          <Form.Group as={Col} md={4} lg={3} className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <PasswordInput
              {...formik.getFieldProps("confirmPassword")}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              isValid={
                formik.touched.confirmPassword && !formik.errors.confirmPassword
              }
              error={formik.errors.confirmPassword}
            />
          </Form.Group>
        </Row>
      </fieldset>

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
      <div className="my-2">
        <h3>The created user role will be "Member" as default</h3>
        <h6>
          If you want to change it as Staff or Admin, you need to update after
          creation
        </h6>
      </div>
    </Form>
  );
};
export default UserAddForm;
