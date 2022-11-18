import axios from "axios";
import { settings } from "../utils/settings";
import authHeader from "./auth-header";

const API_URL = settings.apiURL;

/* AUTH AREA */
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

/* ADMIN AREA */

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

export const getFilteredUsers = (
  page = 0,
  size = 6,
  sort = "firstName",
  direction = "ASC",
  q = ""
) => {
  return axios.get(
    `${API_URL}/users?page=${page}&size=${size}&sort=${sort}&direction=${direction}&q=${q}`,
    {
      headers: authHeader(),
    }
  );
};

export const updateUser = (userId, user) => {
  return axios.put(`${API_URL}/users/${userId}`, user, {
    headers: authHeader(),
  });
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/users/${userId}`, {
    headers: authHeader(),
  });
};

export const getUserWithId = (userId) => {
  return axios.get(`${API_URL}/users/${userId}`, {
    headers: authHeader(),
  });
};

export const createUser = (user) => {
  return axios.post(`${API_URL}/users`, user, {
    headers: authHeader(),
  });
};