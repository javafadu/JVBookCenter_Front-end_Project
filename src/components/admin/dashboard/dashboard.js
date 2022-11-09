import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./dashboard.scss";
import { BiSquare } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { SiAffinitypublisher } from "react-icons/si";
import { MdCategory, MdAssignmentReturn } from "react-icons/md";
import { FaUsersCog, FaGlobe, FaHandHolding } from "react-icons/fa";
import { GiShakingHands, GiSandsOfTime } from "react-icons/gi";
import { generalReport } from "../../../api/report-service";
import Loading from "../../general/loading/loading";
import Spacer from "../../general/spacer/spacer";
import TopLoanedBooks from "./top-loned-books";

const Dashboard = () => {
  const [report, serReport] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const resp = await generalReport();

    serReport(resp.data);

    setLoading(false);
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <>
      <Container className="item-container">
        {loading ? (
          <Loading />
        ) : (
          <Row>
            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Members
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.members}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <FaUsersCog size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Authors
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.authors}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <BsFillPersonLinesFill size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Books
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.books}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <ImBooks size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Publishers
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.publishers}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <SiAffinitypublisher size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Categories
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.categories}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <MdCategory size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Total Loans
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.loans}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <GiShakingHands size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Not Returned
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.unReturnedBooks}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <MdAssignmentReturn size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Card className="mb-2">
                <Card.Header>
                  <BiSquare className="text-info" /> Expired
                </Card.Header>
                <Card.Body className="px-0 py-0">
                  <Card.Text className="item-content">
                    <Col xs={6} className="item-text">
                      <span>{report.expiredBooks}</span>
                    </Col>
                    <Col xs={6} className="item-icon">
                      <span>
                        <GiSandsOfTime size={70} />
                      </span>
                    </Col>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <Spacer height={20} />

      <TopLoanedBooks />
    </>
  );
};

export default Dashboard;
