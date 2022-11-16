import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

/* Get All Loans of Authenticated User */
export const getAuthLoanedBooks = (
  page = 0,
  size = 2,
  sort = "loanDate",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/loans?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  );
};


/* Get Loans of selected Book */
export const getLoansOfBook = (
  id=0,
  page = 0,
  size = 2,
  sort = "loanDate",
  direction = "DESC"
) => {
  return axios.get(
    `${API_URL}/loans/book/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    {
      headers: authHeader(),
    }
  );
};
