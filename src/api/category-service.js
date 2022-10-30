import axios from "axios";
import { settings } from "../utils/settings";

const API_URL = settings.apiURL;

export const getTopCategories = (topn) => {
  const { top } = topn;
  return axios.get(`${API_URL}/public/top-categories`, {
    params: { top: topn },
  });
};

export const getAllCategories = (
  page = 0,
  size = 50,
  sort = "",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/categories?page=${page}&size=${size}&sort=name&direction=${direction}`
  );
};
