import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const getTopAuthors = (topn) => {
  const { top } = topn;
  return axios.get(`${API_URL}/public/top-authors`, {
    params: { top: topn },
  });
};

export const getAllAuthors = (
  page = 0,
  size = 50,
  sort = "",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/authors?page=${page}&size=${size}&sort=name&direction=${direction}`
  );
};

/* Get All Authors with q filter */

export const getFilteredAuthors = (
  page = 0,
  size = 6,
  sort = "name",
  direction = "ASC",
  q = ""
) => {
  return axios.get(
    `${API_URL}/authors?page=${page}&size=${size}&sort=${sort}&direction=${direction}&q=${q}`
  );
};

export const deleteAuthor = (authorId) => {
  return axios.delete(`${API_URL}/authors/${authorId}`, {
    headers: authHeader(),
  });
};

export const updateAuthor = (authorId, author) => {
  return axios.put(`${API_URL}/authors/${authorId}`, author, {
    headers: authHeader(),
  });
};

/* Get An author with Id */
export const getAuthorWithId = (authorId) => {
  return axios.get(`${API_URL}/authors/${authorId}`);
};

export const createAuthor = (author) => {
  return axios.post(`${API_URL}/authors`, author, {
    headers: authHeader(),
  });
};
