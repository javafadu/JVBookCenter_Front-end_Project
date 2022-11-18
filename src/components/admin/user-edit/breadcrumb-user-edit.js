import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./user-edit.scss";

const BreadCrumbUserEdit = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userName = params.get("userName");

  return (
    <div className="breadcrumb-box">
      <Breadcrumb className="breadcrumb-links">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin" }}>
          Admin
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/admin/users" }}>
          Users
        </Breadcrumb.Item>
        <Breadcrumb.Item>{userName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumbUserEdit;
