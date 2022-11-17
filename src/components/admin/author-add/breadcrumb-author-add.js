import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbAuthorAdd = () => {
  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/authors" }}>
          Authors
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add New Author</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbAuthorAdd;
