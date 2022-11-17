import React, { useState, useRef, useEffect } from "react";

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
import "./publisher-edit.scss";
import {
  getPublisherWithId,
  updatePublisher,
  deletePublisher,
} from "../../../api/publisher-service";
import { question, toast } from "../../../utils/functions/swal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Loading from "../../general/loading/loading";

import { getCurrentDate } from "../../../utils/functions/date-time";
import { useSelector } from "react-redux";

const PublisherEditForm = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  let access = false;

  if (user.roles.includes("Administrator")) access = true;

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const publisherId = params.get("id");

  const [publisher, setPublisher] = useState({});
  const [books, setBooks] = useState({});

  const [initialValues, setInitialValues] = useState({
    name: "",
    builtIn: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too short")
      .max(80, "Too Long")
      .required("Please enter name of publisher"),

    builtIn: Yup.bool().required("Please select"),
  });

  const onSubmit = async (values) => {
    setSaving(true);

    try {
      const payload = { ...values };

      await updatePublisher(publisherId, payload);
      toast("Publisher was updated", "success");
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
      const resp = await getPublisherWithId(publisherId);

      const { name, builtIn } = resp.data;

      const dto = {
        name,
        builtIn,
      };

      setInitialValues(dto);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removePublisher = async () => {
    setDeleting(true);
    try {
      /* delete author */
      await deletePublisher(publisherId);
      toast("Publisher was deleted", "success");

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
        removePublisher();
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
          <Col md={8} lg={8} xl={9}>
            <Row>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Name of Publisher</Form.Label>
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
            </Row>
          </Col>
        </Row>
      </fieldset>

      {
        <Alert variant="danger" className="mt-5">
          {access ? "" : `Only administrator can update publisher details `}
          {initialValues.builtIn
            ? ` Built-in publishers can not be deleted and updated. If you want to update please change built-in status firstly`
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
export default PublisherEditForm;
