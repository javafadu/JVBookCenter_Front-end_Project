import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../general/loading/loading";

import "./admin-reports.scss";
import { CgMenuGridO } from "react-icons/cg";

import { unReturnedBooksTable } from "../../../api/report-service";

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "10px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(230, 244, 244)",
      borderBottomColor: "#FFFFFF",
      borderRadius: "25px",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

const columns = [
  {
    cell: () => <CgMenuGridO style={{ fill: "#43a047" }} />,
    width: "56px", // custom width for icon button
    style: {
      color: "#202124",
      fontSize: "17spx",
      fontWeight: 600,
    },
  },
  {
    name: "Book Name",
    selector: (row) => row.name,
    id: "column1",
    sortable: true,
  },
  {
    name: "ISBN",
    id: "column2",
    selector: (row) => row.isbn,
  },
];

const UnReturnedBooksTable = () => {
  const [loading, setLoading] = useState(false);

  const [books, setBooks] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const loadData = async (page = 0, perpage = perPage) => {
    try {
      setLoading(true);
      const resp = await unReturnedBooksTable(page, perPage);
      const {
        content,
        numberOfElements,
        size,
        totalElements,
        totalPages,
        pageable,
      } = resp.data;

      setBooks(resp.data.content);

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

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="px-2">
      <div className="my-2">
        <h2>Un-Returned Books</h2>
      </div>
      <DataTable
        columns={columns}
        data={books}
        customStyles={customStyles}
        progressPending={loading}
        progressComponent={<Loading />}
        onRowClicked
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </Container>
  );
};
export default UnReturnedBooksTable;
