import axios from "axios";
import { settings } from "../utils/settings";

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
    `${API_URL}/authors?page=${page}&size=${size}&sort=name&direction=${direction}&q=${q}`
  );
};
