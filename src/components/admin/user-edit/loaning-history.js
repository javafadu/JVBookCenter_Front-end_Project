import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask-next";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getLoansOfUser } from "../../../api/loan-service";
import Loading from "../../general/loading/loading";
import {
  formatDateLibrary,
  formDateTimeFormat,
  getDate,
} from "../../../utils/functions/date-time";
import "./user-edit.scss";
import { CgMenuGridO } from "react-icons/cg";
import { RiEditLine } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateLoan, getAnyLoanWithId } from "../../../api/loan-service";
import { toast } from "../../../utils/functions/swal";

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
    name: "Book",
    selector: (row) => row.id,
    id: "name",
    sortable: true,
  },
  {
    name: "Loan Date",
    id: "loan-date",
    selector: (row) => formatDateLibrary(row.loanDate),
  },
  {
    name: "Expire Date",
    id: "expire-date",
    selector: (row) => formatDateLibrary(row.expireDate),
  },
  {
    name: "Return Date",
    id: "return-date",
    selector: (row) => formatDateLibrary(row.returnDate),
  },
];

const LoaningHistory = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loans, setLoans] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const [retStatus, setRetStatus] = useState(true);
  const [loanIdToBeUpdated, setLoanIdToBeUpdated] = useState();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get("id");

  /*  *****************Update Loan Operations************* */

  const [initialValues, setInitialValues] = useState({
    notes: "",
    expireDate: "",
    returnDate: "",
  });

  const validationSchema = Yup.object({
    notes: Yup.string().min(2, "Too short").max(300, "Too Long"),
    expireDate: Yup.date().required("Select a date"),
    returnDate: Yup.date(),
  });

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      let formmExpireDate = new Date(values.expireDate);
      let updatedExpireDate = formDateTimeFormat(formmExpireDate);

      let formmReturnDate = new Date(values.returnDate);
      let updatedReturnDate = formmReturnDate
        ? formDateTimeFormat(formmReturnDate)
        : null;

      const payload = {
        notes: values.notes,
        expireDate: updatedExpireDate,
        returnDate: updatedReturnDate,
      };

      await updateLoan(loanIdToBeUpdated, payload);
      toast("Loan was updated", "success");
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  /*  *****************END of Update Loan Operations************* */

  const loadData = async (page = 0, perpage = perPage) => {
    try {
      setLoading(true);
      const resp = await getLoansOfUser(userId, page, perpage);

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

  const handleEdit = async (row) => {
    setRetStatus(!retStatus);

    setLoanIdToBeUpdated(row.id);

    const getLoan = await getLoanWithId(row.id);

    const dto = {
      notes: getLoan.data.notes,
      expireDate: getLoan.data.expireDate,
      returnDate: getLoan.data.returnDate,
    };

    setInitialValues(dto);
  };

  const getLoanWithId = async (loanId) => {
    const getLoandDetail = await getAnyLoanWithId(loanId);
    return getLoandDetail;
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="px-2">
      <div className="my-2">
        <h2>Loaning History</h2>
      </div>
      <DataTable
        columns={columns}
        data={loans}
        customStyles={customStyles}
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
