import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooksByPage } from "../../../../api/book-service";
import { settings } from "../../../../utils/settings";

const Footer = () => {
  const [books, setBooks] = useState([]);

  const loadData = async () => {
    const resp = await getBooksByPage();

    setBooks(resp.data.content);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <div className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5 mt-5">
        <div className="container mt-2 pt-3">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h3 className="text-white mb-4">Get In Touch</h3>
              <p>
                <i className="fa fa-map-marker-alt mr-2"></i>
                {settings.address}
              </p>
              <p>
                <i className="fa fa-phone-alt mr-2"></i>
                {settings.phone1}
              </p>
              <p>
                <i className="fa fa-envelope mr-2"></i>
                {settings.email}
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
              <h3 className="text-white mb-4">Top Books</h3>
              <div className="d-flex flex-column justify-content-start">
                {books.map((book) => (
                  <Link className="text-white-50 mb-2" href="#" key={book.id}>
                    <i className="fa fa-angle-right mr-2"></i>
                    {book.name}
                  </Link>
                ))}
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
