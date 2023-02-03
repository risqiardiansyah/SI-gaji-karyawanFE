import axios from "axios";

// Set config defaults when creating the instance
export const URL = process.env.REACT_APP_BACKEND_API_URL;
export const API = axios.create({
  baseURL: `${URL}api/`,
});

export const setAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // API.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
  API.defaults.headers.common["Content-Type"] = "multipart/form-data";
  API.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
};
