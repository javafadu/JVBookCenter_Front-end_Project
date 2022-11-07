import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../components/admin/sidebar/admin-sidebar";

const AdminTemplate = (props) => {
  const { children } = props;

  return (
    <Container fluid className="p-0 overflow-hidden">
      <Row>
        <Col lg={3}>
          <AdminSideBar />
        </Col>
        <Col lg={9}>
          <Container className="pt-5">{children}</Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTemplate;
