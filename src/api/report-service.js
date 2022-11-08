import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

/* Get A book with Id */
export const generalReport = () => {
  return axios.get(`${API_URL}/reports`, { headers: authHeader() });
};
