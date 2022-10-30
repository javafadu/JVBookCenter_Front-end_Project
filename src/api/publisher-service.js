import axios from "axios";
import { settings } from "../utils/settings";

const API_URL = settings.apiURL;

export const getAllPublishers = (
  page = 0,
  size = 50,
  sort = "",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/publishers?page=${page}&size=${size}&sort=name&direction=${direction}`
  );
};
