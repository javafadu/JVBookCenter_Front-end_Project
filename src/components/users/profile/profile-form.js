import { useFormik } from "formik";
/* import { useDispatch } from "react-redux"; */
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import ReactInputMask from "react-input-mask-next";
import { updateAuthUser } from "../../../api/user-service";
import { toast } from "../../../utils/functions/swal";

const ProfileForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  /* const dispatch = useDispatch(); */

  const [year, month, day] = user.birthDate.split("-");
  const birthDateFormat = [month, day, year].join("/");
  console.log(birthDateFormat);

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    phone: user.phone,
    birthDate: user.birthDate,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    address: Yup.string().required("Please enter your address"),
    phone: Yup.string()
      .required()
      .test(
        "includes_",
        "Please enter your phone number",
        (value) => value && !value.includes("_")
      ),
    birthDate: Yup.string(),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await updateAuthUser(values);
      // if backend returns the updated user as Json we would write below code
      // dispatch(userUpdate(resp.data));
      toast("Your profile was updated successfully", "success");
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
    <>
      <h2>User Information</h2><br/>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            {...formik.getFieldProps("firstName")}
            isInvalid={formik.touched.firstName && formik.errors.firstName}
            isValid={formik.touched.firstName && !formik.errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.firsName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            as={ReactInputMask}
            mask="999-999-9999"
            {...formik.getFieldProps("phone")}
            isInvalid={formik.touched.phone && formik.errors.phone}
            isValid={formik.touched.phone && !formik.errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Birth Date (YYYY-MM-DD)</Form.Label>
          <Form.Control
            type="text"
            as={ReactInputMask}
            mask="9999-99-99"
            {...formik.getFieldProps("birthDate")}
            isInvalid={formik.touched.birthDate && formik.errors.birthDate}
            isValid={formik.touched.birthDate && !formik.errors.birthDate}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.birthDate}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading && <Spinner animation="border" size="sm" />}
          Update
        </Button>
      </Form>
    </>
  );
};

export default ProfileForm;
