import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getLoansOfBook } from "../../../api/loan-service";
import Loading from "../../general/loading/loading";
import { formatDateLibrary } from "../../../utils/functions/date-time";
import "./book-edit.scss";

const columns = [
  {
    name: "User",
    selector: (row) => row.user.firstName + " " + row.user.lastName,
    id: "name",
    sortable: true,
    style: {
      background: "#EFEFEF",
    },
  },
  {
    name: "Loan Date",
    selector: (row) => formatDateLibrary(row.loanDate),
  },
  {
    name: "Expire Date",
    selector: (row) => formatDateLibrary(row.expireDate),
  },
  {
    name: "Return Date",
    selector: (row) => formatDateLibrary(row.returnDate),
  },
];

const LoaningHistory = () => {
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookId = params.get("id");

  const loadData = async (page = 0, perpage = perPage) => {
    try {
      setLoading(true);
      const resp = await getLoansOfBook(bookId, page, perpage);

      console.log(resp.data.content);

      // const result = await objectsToArray(resp.data.content);
      setLoans(resp.data.content);

      setTotalRows(resp.data.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    // Data table 1 tabanlı, bizim api 0 tabanlı
    loadData(page - 1);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    loadData(page - 1, newPerPage);
    setPerPage(newPerPage);
    setLoading(false);
  };

  const handleEdit = (row) => {};

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="px-3">
      <DataTable
        columns={columns}
        data={loans}
        progressPending={loading}
        progressComponent={<Loading />}
        onRowClicked={handleEdit}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </Container>
  );
};
export default LoaningHistory;
