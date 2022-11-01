import React from "react";
import SectionTitle from "../../general/section-title/section-title";
import "./featured-books.scss";

const FeaturedBooks = () => {
  return (
    <div className="text-center">
      <SectionTitle title="Featured Books" />
      <div className="container-fluid py-1">
        <div className="container py-5">
          <div className="owl-carousel team-carousel position-relative d-flex">
            <div className="team-item">
              <img
                className="img-fluid w-100"
                src={require(`../../../assets/img/team-1.jpg`)}
                alt=""
              />
              <div className="bg-light text-center p-4">
                <h5 className="mb-3">Instructor Name</h5>
                <p className="mb-2">Web Design & Development</p>
                <div className="d-flex justify-content-center">
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="team-item">
              <img
                className="img-fluid w-100"
                src={require(`../../../assets/img/team-2.jpg`)}
                alt=""
              />
              <div className="bg-light text-center p-4">
                <h5 className="mb-3">Instructor Name</h5>
                <p className="mb-2">Web Design & Development</p>
                <div className="d-flex justify-content-center">
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="team-item">
              <img
                className="img-fluid w-100"
                src={require(`../../../assets/img/team-3.jpg`)}
                alt=""
              />
              <div className="bg-light text-center p-4">
                <h5 className="mb-3">Instructor Name</h5>
                <p className="mb-2">Web Design & Development</p>
                <div className="d-flex justify-content-center">
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="team-item">
              <img
                className="img-fluid w-100"
                src={require(`../../../assets/img/team-4.jpg`)}
                alt=""
              />
              <div className="bg-light text-center p-4">
                <h5 className="mb-3">Instructor Name</h5>
                <p className="mb-2">Web Design & Development</p>
                <div className="d-flex justify-content-center">
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="team-item">
              <img
                className="img-fluid w-100"
                src={require(`../../../assets/img/team-4.jpg`)}
                alt=""
              />
              <div className="bg-light text-center p-4">
                <h5 className="mb-3">Instructor Name</h5>
                <p className="mb-2">Web Design & Development</p>
                <div className="d-flex justify-content-center">
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="mx-1 p-1" href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooks;
