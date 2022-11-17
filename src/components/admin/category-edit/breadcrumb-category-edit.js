import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./category-edit.scss";

const BreadCrumbCategoryEdit = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryName = params.get("categoryName");

  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/categories" }}>
          Categories
        </Breadcrumb.Item>
        <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbCategoryEdit;
