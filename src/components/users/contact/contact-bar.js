import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  MdOutlineHeadphones,
  MdOutlinePhonelinkRing,
  MdLocationOn,
  MdEmail,
} from "react-icons/md";

import { settings } from "../../../utils/settings";
import "./contact-info.scss";

const ContactBar = () => {
  return (
    <Container className="contact-main-bar">
      <Row className="m-auto justify-content-center">
        <Col lg={3} className="contact-sub-bar">
          <div className="box-icon">
            <MdLocationOn />
          </div>
          <div className="box-title">Address</div>
          <div className="box-content">{settings.address}</div>
        </Col>
        <Col lg={3} className="contact-sub-bar">
          <div className="box-icon">
            <MdOutlineHeadphones />
          </div>
          <div className="box-title">Phone</div>
          <div className="box-content">{settings.phone1}</div>
        </Col>
        <Col lg={3} className="contact-sub-bar">
          <div className="box-icon">
            <MdEmail />
          </div>
          <div className="box-title">E-mail</div>
          <div className="box-content">{settings.email}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactBar;
