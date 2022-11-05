import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import PasswordForm from "./password-form";
import ProfileForm from "./profile-form";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Container>
      <Row>
        <Col>
          <FaUserCircle size="120" />
          <h4>{`${user.firstName} ${user.lastName}`}</h4>
          <p>{user.email}</p>
        </Col>
        <Col>
          <h3>Update Profile</h3>
          <ProfileForm user={user} />
        </Col>
        <Col>
          <h3>Update Passeord</h3>
          <PasswordForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
