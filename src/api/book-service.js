import axios from "axios";
import { settings } from "../utils/settings";

const API_URL = settings.apiURL;

export const getTopBooks = (topn) => {
  const { top } = topn;
  return axios.get(`${API_URL}/public/top-books`, { params: { top: topn } });
};
