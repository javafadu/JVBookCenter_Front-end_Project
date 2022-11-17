import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./publisher-edit.scss";

const BreadCrumbPublisherEdit = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const authorName = params.get("publisherName");

  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/publishers" }}>
          Publishers
        </Breadcrumb.Item>
        <Breadcrumb.Item>{authorName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbPublisherEdit;
