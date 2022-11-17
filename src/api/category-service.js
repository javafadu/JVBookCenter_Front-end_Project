import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

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

/* Get All Authors with q filter */

export const getFilteredCategories = (
  page = 0,
  size = 6,
  sort = "name",
  direction = "ASC",
  q = ""
) => {
  return axios.get(
    `${API_URL}/categories?page=${page}&size=${size}&sort=${sort}&direction=${direction}&q=${q}`
  );
};

export const deleteCategory = (categoryId) => {
  return axios.delete(`${API_URL}/categories/${categoryId}`, {
    headers: authHeader(),
  });
};

export const updateCategory = (categoryId, category) => {
  return axios.put(`${API_URL}/categories/${categoryId}`, category, {
    headers: authHeader(),
  });
};

/* Get A Category with Id */
export const getCategoryWithId = (categories) => {
  return axios.get(`${API_URL}/categories/${categories}`);
};

export const createCategory = (category) => {
  return axios.post(`${API_URL}/categories`, category, {
    headers: authHeader(),
  });
};
