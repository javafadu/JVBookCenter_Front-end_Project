import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ContactForm from "./contact-form";
import ContactInfo from "./contact-info";
import "./contact-info.scss";

const ContactMain = () => {
  return (
    <Container className="contact-main-container">
      <Row className="contact-sub-container">
        <Col md={6}>
          <ContactForm />
        </Col>

        <Col md={6}>
          <ContactInfo />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactMain;
