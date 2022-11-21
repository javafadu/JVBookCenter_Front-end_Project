import React from "react";
import { Accordion, Tabs, Tab } from "react-bootstrap";
import Spacer from "../../general/spacer/spacer";
import TopLoanedAuthors from "../dashboard/top-loned-authors";
import TopLoanedBooks from "../dashboard/top-loned-books";
import TopLoanedCategories from "../dashboard/top-loned-categories";
import TopLoanedPublishers from "../dashboard/top-loned-publishers";
import TopLoaners from "../dashboard/top-loners";
import ExpiredBooksTable from "./expired-books";
import MostPopularBooksTable from "./most-popular-books-table";
import UnReturnedBooksTable from "./un-returned-books";

const AdminReports = () => {
  return (
    <div className="admin-reports">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Most Popular Books</Accordion.Header>
          <Accordion.Body>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Chart (Top 10)">
                <TopLoanedBooks />
              </Tab>
              <Tab eventKey="profile" title="Table">
                <MostPopularBooksTable />
              </Tab>
            </Tabs>
          </Accordion.Body>
        </Accordion.Item>

        <Spacer height={20} />

        <Accordion.Item eventKey="1">
          <Accordion.Header>Most Popular Authors</Accordion.Header>
          <Accordion.Body>
            <TopLoanedAuthors />
          </Accordion.Body>
        </Accordion.Item>

        <Spacer height={20} />

        <Accordion.Item eventKey="2">
          <Accordion.Header>Most Popular Categories</Accordion.Header>
          <Accordion.Body>
            <TopLoanedCategories />
          </Accordion.Body>
        </Accordion.Item>

        <Spacer height={20} />

        <Accordion.Item eventKey="3">
          <Accordion.Header>Most Popular Publishers</Accordion.Header>
          <Accordion.Body>
            <TopLoanedPublishers />
          </Accordion.Body>
        </Accordion.Item>

        <Spacer height={20} />

        <Accordion.Item eventKey="4">
          <Accordion.Header>Un Returned Books</Accordion.Header>
          <Accordion.Body>
            <UnReturnedBooksTable />
          </Accordion.Body>
        </Accordion.Item>

        <Spacer height={20} />

        <Accordion.Item eventKey="5">
          <Accordion.Header>Expired Books</Accordion.Header>
          <Accordion.Body>
            <ExpiredBooksTable />
          </Accordion.Body>
        </Accordion.Item>

        <Spacer height={20} />

        <Accordion.Item eventKey="6">
          <Accordion.Header>Most Borrowers</Accordion.Header>
          <Accordion.Body>
            <TopLoaners />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default AdminReports;
