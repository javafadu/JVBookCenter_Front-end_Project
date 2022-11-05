import React, { useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "./auth.scss";
import { RiCloseCircleLine, RiHome7Line } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { useEffect } from "react";
const Auth = () => {
  const [searchParams] = useSearchParams();

  const [defaultTab, setDefaultTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    setDefaultTab(searchParams.get("type") || "login");
  }, [searchParams]);

  return (
    <Container fluid className="auth">
      <Row>
        <Col>
          <div className="toolbar">
            <RiCloseCircleLine onClick={() => navigate(-1)} />{" "}
            {/* Tıklandığında bir önceki sayfaya yönlendirir */}
            <RiHome7Line onClick={() => navigate("/")} />
          </div>
          <div className="form-area">
            <Card>
              <Card.Body>
                <Card.Title className="title-icon">
                  <BsFillPeopleFill />
                </Card.Title>

                <Tabs
                  activeKey={defaultTab}
                  onSelect={(k) => setDefaultTab(k)}
                  className="form-items mb-3"
                >
                  <Tab eventKey="login" title="Login">
                    <LoginForm />
                  </Tab>
                  <Tab eventKey="register" title="Register">
                    <RegisterForm setDefaultTab={setDefaultTab} />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
