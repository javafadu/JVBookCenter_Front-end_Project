import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbBookAdd = () => {
  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/books" }}>
          Books
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add New Book</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbBookAdd;
