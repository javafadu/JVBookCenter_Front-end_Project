import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

/* Get A book with Id */
export const generalReport = () => {
  return axios.get(`${API_URL}/reports`, { headers: authHeader() });
};

/* Most Popular Books */
export const mostPopularBooksTable = (amount = 50, page = 0, size = 10) => {
  return axios.get(
    `${API_URL}/reports/most-popular-books?amount=${amount}&page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

/* Un Returned Books */
export const unReturnedBooksTable = (page = 0, size = 10) => {
  return axios.get(
    `${API_URL}/reports/unreturned-books?page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

/* Expired Books */
export const expiredBooksTable = (page = 0, size = 10) => {
  return axios.get(
    `${API_URL}/reports/expired-books?page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

/* Most Books */
export const mostBorrowers = (page = 0, size = 10) => {
  return axios.get(`${API_URL}/reports/most-borrowers?page=0&size=10`, {
    headers: authHeader(),
  });
};
