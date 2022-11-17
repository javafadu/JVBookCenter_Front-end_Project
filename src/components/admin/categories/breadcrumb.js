import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./categories.scss";

const BreadCrumb = () => {
  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/categories" }}>
          Categories
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
