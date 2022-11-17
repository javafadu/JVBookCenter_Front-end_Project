import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";

import { searchUsers } from "../../../api/user-service";
import { getBookWithId } from "../../../api/book-service";

import Loading from "../../general/loading/loading";
import "./book-edit.scss";
import { saveLoan } from "../../../api/loan-service";
import { toast } from "../../../utils/functions/swal";

const LoanForm = () => {
  const [saving, setSaving] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loanable, setLoanable] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookParamId = params.get("id");

  const [initialValues] = useState({
    userId: "",
    bookId: "",
    notes: "",
  });

  const validationSchema = Yup.object({
    userId: Yup.number().positive().integer().required("Select a user"),
    notes: Yup.string().min(2, "Too short").max(300, "Too Long"),
  });

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = {
        userId: values.userId,
        bookId: bookParamId,
        notes: values.notes,
      };

      console.log(payload);

      await saveLoan(payload);
      toast("Loan was created", "success");
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
  });

  const searchUserHandler = async () => {
    setLoading(true);
    const resultUser = await searchUsers(searchText);
    setUsers(resultUser.data.content);
    setLoading(false);
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getBookWithId(bookParamId);
      setLoanable(resp.data.loanable);
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
    <Container
      className={`loan-form w-100 ${!loanable ? "d-none" : "d-block"}`}
    >
      <div className="my-2">
        <h3>Book This book for below User</h3>
      </div>
      <Row>
        <div className="search-area">
          <input
            type="text"
            placeholder="Search User"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button onClick={searchUserHandler}>Search</button>
          <label className="px-2">
            {" "}
            Search in First Name, Last Name, E-mail, Phone No
          </label>
        </div>

        <Form noValidate onSubmit={formik.handleSubmit} className="px-2">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Member</Form.Label>

              {loading ? (
                <Loading />
              ) : (
                <Form.Select
                  type="number"
                  {...formik.getFieldProps("userId")}
                  isInvalid={formik.touched.userId && formik.errors.userId}
                  isValid={formik.touched.userId && !formik.errors.userId}
                >
                  <option value="0">Select</option>

                  {users.map((user, index) => {
                    return (
                      <option value={user.id} key={index}>
                        {user.firstName} {user.lastName}
                      </option>
                    );
                  })}
                </Form.Select>
              )}

              <Form.Control.Feedback type="invalid">
                {formik.errors.userId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("notes")}
                isInvalid={formik.touched.notes && formik.errors.notes}
                isValid={formik.touched.notes && !formik.errors.notes}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.notes}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving && <Spinner animation="border" size="sm" />} Book This
              Book
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default LoanForm;
