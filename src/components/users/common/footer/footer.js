import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopBooks } from "../../../../api/book-service";
import { getTopCategories } from "../../../../api/category-service";
import { getTopAuthors } from "../../../../api/author-service";
import { settings } from "../../../../utils/settings";
import Loading from "../../../general/loading/loading";

const Footer = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const resp = await getTopBooks(5);
    const resp2 = await getTopCategories(5);
    const resp3 = await getTopAuthors(5);

    setBooks(resp.data);
    setCategories(resp2.data);
    setAuthors(resp3.data);

    setLoading(false);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <div className="container-fluid position-relative overlay-top bg-dark text-white-50 py-5 mt-5">
        <div className="container mt-2 pt-3">
          <div className="row">
            <div className="col-sm-6 col-md-3 mb-3">
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
              <div className="d-inline-flex align-items-center">
                <Link className="text-white px-2" href="#">
                  <i className="fab fa-2x fa-twitter"></i>
                </Link>
                <Link className="text-white px-2" href="#">
                  <i className="fab fa-2x fa-facebook-f"></i>
                </Link>
                <Link className="text-white px-2" href="#">
                  <i className="fab fa-2x fa-linkedin-in"></i>
                </Link>
                <Link className="text-white px-2" href="#">
                  <i className="fab fa-2x fa-instagram"></i>
                </Link>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 mb-5">
              <h3 className="text-white mb-4">Top Books</h3>
              <div className="d-flex flex-column justify-content-start">
                {loading ? (
                  <Loading />
                ) : (
                  books.map((book, index) => (
                    <Link className="text-white-50 mb-2" href="#" key={index}>
                      <i className="fa fa-angle-right mr-2"></i>
                      {book[1]}
                    </Link>
                  ))
                )}
              </div>
            </div>
            <div className="col-sm-6 col-md-3 mb-5">
              <h3 className="text-white mb-4">Top Categories</h3>
              <div className="d-flex flex-column justify-content-start">
                {loading ? (
                  <Loading />
                ) : (
                  categories.map((category, index) => (
                    <Link className="text-white-50 mb-2" href="#" key={index}>
                      <i className="fa fa-angle-right mr-2"></i>
                      {category[1]}
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="col-sm-6 col-md-3 mb-5">
              <h3 className="text-white mb-4">Top Authors</h3>
              <div className="d-flex flex-column justify-content-start">
                {loading ? (
                  <Loading />
                ) : (
                  authors.map((author, index) => (
                    <Link className="text-white-50 mb-2" href="#" key={index}>
                      <i className="fa fa-angle-right mr-2"></i>
                      {author[1]}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
