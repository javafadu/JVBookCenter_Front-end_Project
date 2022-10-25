import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/img/logo.png";
import { settings } from "../../../../utils/settings";

const Footer = () => {
  return (
    <>
      <div className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5 mt-5">
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-md-6 mb-5">
              <a href="index.html" className="navbar-brand">
                <h1 className="mt-n2 text-uppercase text-white">
                  <img
                    src={logo}
                    alt={settings.siteName}
                    className="img-fluid"
                  />
                </h1>
              </a>
              <p className="m-0">
                JV library provides loaning hundreds of books online with only
                one click
              </p>
            </div>
            <div className="col-md-6 mb-5">
              <h3 className="text-white mb-4">Newsletter</h3>
              <div className="w-100">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-light"
                    placeholder="Your Email Address"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary px-4">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Get In Touch</h3>
              <p>
                <i className="fa fa-map-marker-alt mr-2"></i>123 Street, New
                York, USA
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>+012 345 67890
              </p>
              <p>
                <i className="fa fa-envelope mr-2"></i>info@example.com
              </p>
              <div className="d-flex justify-content-start mt-4">
                <Link className="text-white mr-4" href="#">
                  <i className="fab fa-2x fa-twitter"></i>
                </Link>
                <Link className="text-white mr-4" href="#">
                  <i className="fab fa-2x fa-facebook-f"></i>
                </Link>
                <Link className="text-white mr-4" href="#">
                  <i className="fab fa-2x fa-linkedin-in"></i>
                </Link>
                <Link className="text-white" href="#">
                  <i className="fab fa-2x fa-instagram"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Top Categories</h3>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Web Design
                </Link>
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Apps Design
                </Link>
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Marketing
                </Link>
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Research
                </Link>
                <Link className="text-white-50" href="#">
                  <i className="fa fa-angle-right mr-2"></i>SEO
                </Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h3 className="text-white mb-4">Top Authors</h3>
              <div className="d-flex flex-column justify-content-start">
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Privacy Policy
                </Link>
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Terms & Condition
                </Link>
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Regular FAQs
                </Link>
                <Link className="text-white-50 mb-2" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Help & Support
                </Link>
                <Link className="text-white-50" href="#">
                  <i className="fa fa-angle-right mr-2"></i>Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
