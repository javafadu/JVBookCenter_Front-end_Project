import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./book-edit.scss";

const BreadCrumbBookEdit = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookName = params.get("bookName");

  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/books" }}>
          Books
        </Breadcrumb.Item>
        <Breadcrumb.Item>{bookName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbBookEdit;
