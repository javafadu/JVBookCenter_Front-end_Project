import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const BreadCrumbCategoryAdd = () => {
  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/categories" }}>
          Categories
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add New Category</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbCategoryAdd;
