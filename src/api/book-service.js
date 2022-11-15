import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const getTopBooks = (topn) => {
  const { top } = topn;
  return axios.get(`${API_URL}/public/top-books`, { params: { top: topn } });
};

/* Default Get Featured Books*/

export const getFeaturedBooks = (
  page = 0,
  size = 6,
  sort = "name",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/books/featured-books?page=${page}&size=${size}&sort=name&direction=${direction}`
  );
};

/* Get All book with q filter */

export const getFilteredBooks = (
  page = 0,
  size = 6,
  sort = "name",
  direction = "ASC",
  q = "",
  cat = "",
  author = "",
  publisher = ""
) => {
  return axios.get(
    `${API_URL}/books?page=${page}&size=${size}&sort=name&direction=${direction}&q=${q}&cat=${cat}&author=${author}&publisher=${publisher}`
  );
};

/* Get A book with Id */
export const getBookWithId = (id) => {
  return axios.get(`${API_URL}/books/${id}`);
};

export const createBook = (book) => {
  return axios.post(`${API_URL}/books`, book, {
    headers: authHeader(),
  });
};

export const updateBook = (bookId, book) => {
  return axios.put(`${API_URL}/books/${bookId}`, book, {
    headers: authHeader(),
  });
};

export const deleteBook = (bookId) => {
  return axios.delete(`${API_URL}/books/${bookId}`, {
    headers: authHeader(),
  });
};
