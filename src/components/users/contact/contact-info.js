import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./contact-info.scss";
import { settings } from "../../../utils/settings";

const ContactInfo = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="contact-info-box">
            <div>
              <h3>GET IN TOUCH</h3>
            </div>
            <h4>Email</h4>
            <p>
              The easiest way to reach us is by email at {settings.email} -
              we're online ready to help you with all your library queries from
              09.00 - 17.00 Monday to Friday.
            </p>
            <h4>Phone</h4>
            <p>
              Call us on {settings.phone1}.<br />
              Lines are open 08:30 - 17:00 Monday - Friday.
            </p>
            <h4>Tell us what books we should buy</h4>
            <p>
              If you'd like to recommend a book for us to purchase, complete our
              form with as much detail as you can, and we'll get back to you -
              we'll prioritise purchasing ebooks and other online resources that
              you'll be able to access remotely.
            </p>
            <h4>Tell us your feedback</h4>
            <p>
              We want to hear your comments on our library services, good or
              bad, so we know where we need to improve, especially if we can do
              more to help you at this time. Please share your feedbacks with
              our contact-form, or contact us through any of the methods above.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactInfo;
