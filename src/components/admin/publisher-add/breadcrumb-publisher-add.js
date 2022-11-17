import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const BreadCrumbPublisherAdd = () => {
  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/publishers" }}>
          Publishers
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add New Publisher</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbPublisherAdd;
