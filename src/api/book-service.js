import axios from "axios";
import { settings } from "../utils/settings";

const API_URL = settings.apiURL;

export const getTopBooks = (topn) => {
  const { top } = topn;
  return axios.get(`${API_URL}/public/top-books`, { params: { top: topn } });
};

export const getBooksByPage = (
  page = 0,
  size = 6,
  sort = "name",
  direction = "ASC",
  q = "",
  cat = 5,
  author = "",
  publisher = ""
) => {
  return axios.get(
    `${API_URL}/books?page=0&size=5&sort=name&direction=ASC&cat=${cat}`
  );
};
