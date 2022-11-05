import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserSideBar from "./sidebar/user-sidebar";

const Profile = (props) => {
  const { children } = props;

  return (
    <Container fluid className="p-0 overflow-hidden">
      <Row>
        <Col lg={3}>
          <UserSideBar />
        </Col>
        <Col lg={9}>
          <Container className="pt-5">
            <div className="px-5">{children}</div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
