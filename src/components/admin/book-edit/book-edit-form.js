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
import "./book-edit.scss";
import {
  getBookWithId,
  updateBook,
  deleteBook,
} from "../../../api/book-service";
import { question, toast } from "../../../utils/functions/swal";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Loading from "../../general/loading/loading";
import { deleteImage, imageUpload } from "../../../api/image-service";
import { getAllAuthors } from "../../../api/author-service";
import { getAllCategories } from "../../../api/category-service";
import { getAllPublishers } from "../../../api/publisher-service";
import { getCurrentDate } from "../../../utils/functions/date-time";
import { useSelector } from "react-redux";

let isImageChanged = false;

const BookEditForm = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  let access = false;

  if (user.roles.includes("Administrator")) access = true;

  const [imageSrc, setImageSrc] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileImageRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get("id");

  const [book, setBook] = useState({});
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const [imageFileName, setImageFileName] = useState("");

  const [initialValues, setInitialValues] = useState({
    name: "",
    isbn: "",
    pageCount: "",
    bookAuthor: "",
    bookPublisher: "",
    publishDate: "",
    bookCategory: "",
    imageLink: "",
    loanable: "",
    shelfCode: "",
    active: "",
    featured: "",
    builtIn: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too short")
      .max(80, "Too Long")
      .required("Please enter name of book"),
    isbn: Yup.string()
      .required()
      .matches(
        /([0-9][0-9][0-9][-][0-9][0-9][-][0-9][0-9][0-9][0-9][0-9][-][0-9][0-9][-][0-9]$)/,
        "Please enter a valid ISBN number"
      ),
    pageCount: Yup.number().positive().integer(),
    bookAuthor: Yup.number().positive().integer().required("Select an author"),
    bookPublisher: Yup.number()
      .positive()
      .integer()
      .required("Select an publisher"),
    publishDate: Yup.number(),
    bookCategory: Yup.number()
      .positive()
      .integer()
      .required("Select an category"),
    loanable: Yup.bool().required("Please select"),
    shelfCode: Yup.string()
      .required("Please enter name of book")
      .matches(
        /([A-Z][A-Z][-][0-9][0-9][0-9]$)/,
        "Please use Upper Case for first letters"
      ),
    active: Yup.bool().required("Please select"),
    featured: Yup.bool().required("Please select"),

    builtIn: Yup.bool().required("Please select"),
  });

  const onSubmit = async (values) => {
    setSaving(true);

    try {
      // isImageChanged görüntü değiştirildiğinde true olacak
      if (isImageChanged) {
        // Mevcut image database den siliniyor

        const newImageFile = fileImageRef.current.files[0];
        const formData = new FormData();
        formData.append("file", values.image);
        formData.delete("file", fileImageRef.current.files[0]);
        formData.append("file", fileImageRef.current.files[0], imageFileName);

        const respImage = await imageUpload(formData);
      }

      const payload = { ...values };
      delete payload.image;
      isImageChanged
        ? (payload.imageLink = `assets/img/books/${imageFileName}`)
        : (payload.imageLink = initialValues.imageLink);
      isImageChanged = false;
      console.log(payload);
      await updateBook(bookId, payload);
      toast("Book was updated", "success");
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

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };
  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    var filename = `${Math.random().toString(32).slice(2)}${
      fileImageRef.current.files[0].name
    }`;

    setImageFileName(filename);
    if (!file) return;

    const reader = new FileReader(); //Seçilen görüntüyü ekrana yerleştirdik
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    isImageChanged = true;
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getBookWithId(bookId);

      const {
        name,
        isbn,
        pageCount,
        bookAuthor,
        bookPublisher,
        publishDate,
        bookCategory,
        imageLink,
        loanable,
        shelfCode,
        active,
        featured,
        builtIn,
      } = resp.data;

      const dto = {
        name,
        isbn,
        pageCount,
        bookAuthor: bookAuthor.id,
        bookPublisher: bookPublisher.id,
        publishDate,
        bookCategory: bookCategory.id,
        imageLink,
        loanable,
        shelfCode,
        active,
        featured,
        builtIn,
      };

      setInitialValues(dto);
      setImageSrc(resp.data.imageLink);
      const resp2 = await getAllCategories();
      setCategories(resp2.data.content);
      const resp3 = await getAllAuthors();
      setAuthors(resp3.data.content);
      const resp4 = await getAllPublishers();
      setPublishers(resp4.data.content);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async () => {
    setDeleting(true);
    try {
      /* delete book */
      await deleteBook(bookId);
      toast("Book was deleted", "success");

      /* delete image of deleted book */
      // the code will be added soon here

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
        removeBook();
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
          <Col xl={3} className="image-area">
            <Form.Control
              type="file"
              name="image"
              className="d-none"
              onChange={handleImageChange}
              ref={fileImageRef}
            />
            {isImageChanged ? (
              <img src={imageSrc} className="img-fluid" alt="..." />
            ) : (
              <img
                className="img-fluid rounded"
                src={require(`../../../${imageSrc}`)}
                alt=""
              />
            )}

            {formik.errors.imageLink && (
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
                <Form.Label>Page Count</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("pageCount")}
                  isInvalid={
                    formik.touched.pageCount && formik.errors.pageCount
                  }
                  isValid={formik.touched.pageCount && !formik.errors.pageCount}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.pageCount}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Publish Year</Form.Label>
                <Form.Control
                  type="number"
                  {...formik.getFieldProps("publishDate")}
                  isInvalid={
                    formik.touched.publishDate && formik.errors.publishDate
                  }
                  isValid={
                    formik.touched.publishDate && !formik.errors.publishDate
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.publishDate}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Book Author</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("bookAuthor")}
                  isInvalid={
                    formik.touched.bookAuthor && formik.errors.bookAuthor
                  }
                  isValid={
                    formik.touched.bookAuthor && !formik.errors.bookAuthor
                  }
                >
                  {authors.map((author, index) => {
                    return (
                      <option value={author.id} key={index}>
                        {author.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.bookAuthor}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Book Publisher</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("bookPublisher")}
                  isInvalid={
                    formik.touched.bookPublisher && formik.errors.bookPublisher
                  }
                  isValid={
                    formik.touched.bookPublisher && !formik.errors.bookPublisher
                  }
                >
                  {publishers.map((publisher, index) => {
                    return (
                      <option value={publisher.id} key={index}>
                        {publisher.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.bookPublisher}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Book Category</Form.Label>
                <Form.Select
                  {...formik.getFieldProps("bookCategory")}
                  isInvalid={
                    formik.touched.bookCategory && formik.errors.bookCategory
                  }
                  isValid={
                    formik.touched.bookCategory && !formik.errors.bookCategory
                  }
                >
                  {categories.map((category, index) => {
                    return (
                      <option value={category.id} key={index}>
                        {category.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.bookCategory}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Shelf Code</Form.Label>
                <Form.Control
                  type="text"
                  as={InputMask}
                  mask="aa-999"
                  {...formik.getFieldProps("shelfCode")}
                  isInvalid={
                    formik.touched.shelfCode && formik.errors.shelfCode
                  }
                  isValid={formik.touched.shelfCode && !formik.errors.shelfCode}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.shelfCode}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Featured</Form.Label>

                <Form.Select
                  {...formik.getFieldProps("featured")}
                  isInvalid={formik.touched.featured && formik.errors.featured}
                  isValid={formik.touched.featured && !formik.errors.featured}
                >
                  <option value={true}>Featured</option>
                  <option value={false}>Not-Featured</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.featured}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={4} lg={3} className="mb-3">
                <Form.Label>Featured</Form.Label>

                <Form.Select
                  {...formik.getFieldProps("active")}
                  isInvalid={formik.touched.active && formik.errors.active}
                  isValid={formik.touched.active && !formik.errors.active}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Not-Active</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.active}
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
          {access ? "" : `Only administrator can update book details `}
          {initialValues.builtIn
            ? ` Built-in books can not be deleted and updated. If you want to update please change built-in status firstly`
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

export default BookEditForm;
