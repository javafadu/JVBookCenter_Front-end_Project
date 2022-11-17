import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

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

/* Get All publishers with q filter */

export const getFilteredPublishers = (
  page = 0,
  size = 6,
  sort = "name",
  direction = "ASC",
  q = ""
) => {
  return axios.get(
    `${API_URL}/publishers?page=${page}&size=${size}&sort=${sort}&direction=${direction}&q=${q}`
  );
};

export const deletePublisher = (publisherId) => {
  return axios.delete(`${API_URL}/publishers/${publisherId}`, {
    headers: authHeader(),
  });
};

export const updatePublisher = (publisherId, publisher) => {
  return axios.put(`${API_URL}/publishers/${publisherId}`, publisher, {
    headers: authHeader(),
  });
};

/* Get A publisher with Id */
export const getPublisherWithId = (publisherId) => {
  return axios.get(`${API_URL}/publishers/${publisherId}`);
};

export const createPublisher = (publisher) => {
  return axios.post(`${API_URL}/publishers`, publisher, {
    headers: authHeader(),
  });
};
