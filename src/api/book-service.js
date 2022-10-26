import axios from "axios";
import { settings } from "../utils/settings";

const API_URL = settings.apiURL;

export const getBooksByPage = () => {
  return axios.get(
    `${API_URL}/books?publisher=4&page=0&size=5&sort=name&direction=ASC`
  );
};
