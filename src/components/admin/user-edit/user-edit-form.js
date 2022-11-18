import React, { useState, useRef, useEffect } from "react";
import InputMask from "react-input-mask-next";
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
  Alert,
} from "react-bootstrap";
import "./user-edit.scss";
import {
  getUserWithId,
  updateUser,
  deleteUser,
} from "../../../api/user-service";
import { question, toast } from "../../../utils/functions/swal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Loading from "../../general/loading/loading";

import { useSelector } from "react-redux";

const UserEditForm = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  let access = false;

  if (user.roles.includes("Administrator") || user.roles.includes("Staff"))
    access = true;

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  const [infoUser, setInfoUser] = useState({});
  const [memberCheck, setMemberCheck] = useState(false);
  const [staffCheck, setStaffCheck] = useState(false);
  const [adminCheck, setAdminCheck] = useState(false);

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    birthDate: "",
    email: "",
    score: "",
    builtIn: "",
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
    builtIn: Yup.bool().required("Please select"),
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
      const staffObje = {
        id: 2,
        name: "ROLE_STAFF",
      };
      const adminObje = {
        id: 3,
        name: "ROLE_ADMIN",
      };

      if (memberCheck) updatedRoles.push(memberObje);
      if (staffCheck) updatedRoles.push(staffObje);
      if (adminCheck) updatedRoles.push(adminObje);

      payload.roles = updatedRoles;

      await updateUser(userId, payload);
      toast("User was updated", "success");
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

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getUserWithId(userId);

      setInitialValues(resp.data);
      const roles = resp.data.roles;

      if (roles.includes("Member")) setMemberCheck(true);
      if (roles.includes("Staff")) setStaffCheck(true);
      if (roles.includes("Administrator")) setAdminCheck(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async () => {
    setDeleting(true);
    try {
      /* delete user */
      await deleteUser(userId);
      toast("User was deleted", "success");

      navigate(-1);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    question(
      "Are you sure to delete?",
      "You won't be able to revert this!"
    ).then((result) => {
      if (result.isConfirmed) {
        removeUser();
      }
    });
  };

  const isError = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loading />
  ) : (
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
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="number"
              disabled={true}
              {...formik.getFieldProps("score")}
              isInvalid={formik.touched.score && formik.errors.score}
              isValid={formik.touched.score && !formik.errors.score}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.score}
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

          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>User Roles</Form.Label>
            {["checkbox"].map((type) => (
              <div
                key={`inline-${type}`}
                className="mb-3 square border py-3 d-flex justify-content-between"
              >
                <Form.Check
                  inline
                  label="Member"
                  name="group1"
                  checked={memberCheck}
                  onChange={() => setMemberCheck(!memberCheck)}
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="Staff"
                  name="group1"
                  checked={staffCheck}
                  onChange={() => setStaffCheck(!staffCheck)}
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  label="Administrator"
                  name="group1"
                  checked={adminCheck}
                  onChange={() => setAdminCheck(!adminCheck)}
                  type={type}
                  id={`inline-${type}-2`}
                />
              </div>
            ))}
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </fieldset>

      {
        <Alert variant="danger" className="mt-5">
          {access ? "" : `Only administrator  can update this user `}
          {initialValues.builtIn
            ? ` Built-in users can not be deleted and updated. If you want to update please change built-in status firstly`
            : ``}
        </Alert>
      }

      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          {access && (
            <>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving && <Spinner animation="border" size="sm" />} Update
              </Button>
            </>
          )}

          {access ? (
            !initialValues.builtIn ? (
              <>
                <Button
                  variant="danger"
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                >
                  {deleting && <Spinner animation="border" size="sm" />} Delete
                </Button>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default UserEditForm;
