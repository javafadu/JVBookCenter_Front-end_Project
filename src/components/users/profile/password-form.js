import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Button, Spinner } from "react-bootstrap";
import PasswordInput from "../../users/common/password-input/password-input";
import { updateAuthPassword } from "../../../api/user-service";
import { toast } from "../../../utils/functions/swal";
const PasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string()
      .required("Please enter your new password")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmNewPassword: Yup.string()
      .required("Please re-enter your new password")
      .oneOf([Yup.ref("newPassword")], "Password fields doesn't match"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await updateAuthPassword(values);
      toast("Your password has been changed successfully", "success");
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
      <Form.Group className="mb-3">
        <Form.Label>Current Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("oldPassword")}
          isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
          isvalid={formik.touched.oldPassword && !formik.errors.oldPassword}
          error={formik.errors.oldPassword}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("newPassword")}
          isInvalid={formik.touched.newPassword && formik.errors.newPassword}
          isvalid={formik.touched.newPassword && !formik.errors.newPassword}
          error={formik.errors.newPassword}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password Confirm</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("confirmNewPassword")}
          isInvalid={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
          }
          isvalid={
            formik.touched.confirmNewPassword &&
            !formik.errors.confirmNewPassword
          }
          error={formik.errors.confirmNewPassword}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && <Spinner animation="border" size="sm" />} Update
      </Button>
    </Form>
  );
};
export default PasswordForm;
