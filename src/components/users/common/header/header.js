import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/img/logo.png";
import { settings } from "../../../../utils/settings";

const Header = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row py-2 px-lg-5">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center text-white">
              <small>
                <i className="fa fa-phone-alt mr-2"></i>
                {settings.phone1}
              </small>
              <small className="px-3">|</small>
              <small>
                <i className="fa fa-envelope mr-2"></i>{settings.email}
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

      <div className="container-fluid p-0 sticky-top">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
          <a href="index.html" className="navbar-brand ml-lg-3">
            <h1 className="m-0 text-uppercase text-primary">
              <img src={logo} alt={settings.siteName} className="img-fluid" />
            </h1>
          </a>
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between px-lg-3"
            id="navbarCollapse"
          >
            <div className="navbar-nav mx-auto py-0">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              <Link to="/library" className="nav-item nav-link">
                Library
              </Link>

              <Link to="/contact" className="nav-item nav-link">
                Contact
              </Link>
            </div>
            <Link className="btn btn-primary py-2 px-4 d-none d-lg-block mx-2">
              Sign Up
            </Link>
            <Link className="btn btn-primary py-2 px-4 d-none d-lg-block">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
