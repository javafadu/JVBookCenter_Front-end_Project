import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../../assets/img/logo.png";
import { settings } from "../../../../utils/settings";
import UserMenu from "./user-menu";
import "./header.scss";

const Header = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center text-white">
              <small>
                <i className="fa fa-phone-alt mr-2"></i> &nbsp;
                {settings.phone1}
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2"></i> &nbsp;
                {settings.email}
              </small>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <Link className="text-white px-2">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link className="text-white px-2">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link className="text-white px-2">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link className="text-white px-2">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link className="text-white px-2">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Navbar bg="white" expand="lg" className="sticky-top main-navbar py-0">
        <Container>
          <Navbar.Brand as={Link} to="/" title={settings.siteName}>
            <img src={logo} alt={settings.siteName} />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="text-warning"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/library">
                Library
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
            </Nav>

            <UserMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
