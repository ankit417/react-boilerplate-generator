import { apiGenerator } from "../helpers/Helpers";

// const token = getCookie("token"); // GET TOKEN FROM COOKIE
// const token = localStorage.getItem("token");
export const BASE_URL = "http://139.59.23.105:8853/api"; // BASE URL
export const FILE_URL = "http://139.59.23.105:8853/docs/"; // BASE FILE URL

export const TABLE_LIMIT = 5;

// API FUNCTION
export const api = apiGenerator({ baseURL: BASE_URL });

// API PATHS
export const APIS = {
  login: "/auth/login",
  password: "/user/pass",
  common: "/common",
  news: "/common/type?name=news",
};
