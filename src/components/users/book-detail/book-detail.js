import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getBookWithId } from "../../../api/book-service";
import SectionTitle from "../../general/section-title/section-title";

const BookDetail = (props) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get("id");

  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  const loadData = async () => {
    try {
      const resp = await getBookWithId(bookId);
      setBook(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-5">
              <div className="section-title position-relative mb-5">
                <h1 className="display-4">{book.name}</h1>
                <h5>{book.bookAuthor?.name}</h5>
              </div>

              <div>
                <img
                  className="img-fluid rounded w-50 mb-4"
                  src={require(`../../../${book.imageLink}`).default}
                  alt={book.name}
                />
              </div>

              <p>
                Sadipscing labore amet rebum est et justo gubergren. Et eirmod
                ipsum sit diam ut magna lorem. Nonumy vero labore lorem sanctus
                rebum et lorem magna kasd, stet amet magna accusam consetetur
                eirmod. Kasd accusam sit ipsum sadipscing et at at sanctus et.
                Ipsum sit gubergren dolores et, consetetur justo invidunt at et
                aliquyam ut et vero clita. Diam sea sea no sed dolores diam
                nonumy, gubergren sit stet no diam kasd vero.
              </p>
            </div>
          </div>

          <div className="col-lg-4 mt-5 mt-lg-0">
            <div className="bg-primary mb-5 py-3">
              <h3 className="text-white py-3 px-4 m-0">Course Features</h3>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className="text-white my-3">Instructor</h6>
                <h6 className="text-white my-3">John Doe</h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className="text-white my-3">Rating</h6>
                <h6 className="text-white my-3">
                  4.5 <small>(250)</small>
                </h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className="text-white my-3">Lectures</h6>
                <h6 className="text-white my-3">15</h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className="text-white my-3">Duration</h6>
                <h6 className="text-white my-3">10.00 Hrs</h6>
              </div>
              <div className="d-flex justify-content-between border-bottom px-4">
                <h6 className="text-white my-3">Skill level</h6>
                <h6 className="text-white my-3">All Level</h6>
              </div>
              <div className="d-flex justify-content-between px-4">
                <h6 className="text-white my-3">Language</h6>
                <h6 className="text-white my-3">English</h6>
              </div>
              <h5 className="text-white py-3 px-4 m-0">Course Price: $199</h5>
              <div className="py-3 px-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
