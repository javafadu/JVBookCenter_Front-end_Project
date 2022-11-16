import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

export const register = (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getUser = () => {
  return axios.get(`${API_URL}/user`, { headers: authHeader() });
};

export const updateAuthUser = (user) => {
  return axios.put(`${API_URL}/user`, user, { headers: authHeader() });
};

export const updateAuthPassword = (passwords) => {
  return axios.patch(`${API_URL}/auth`, passwords, {
    headers: authHeader(),
  });
};

export const searchUsers = (
  q = "",
  page = 0,
  size = 20,
  sort = "firstName",
  direction = "ASC"
) => {
  return axios.get(
    `${API_URL}/users?q=${q}&page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
    { headers: authHeader() }
  );
};
