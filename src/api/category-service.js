import axios from "axios";
import { settings } from "../utils/settings";

const API_URL = settings.apiURL;

export const getTopCategories = (topn) => {
  const { top } = topn;
  return axios.get(`${API_URL}/public/top-categories`, {
    params: { top: topn },
  });
};
