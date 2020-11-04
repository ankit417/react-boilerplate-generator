import { apiGenerator, getCookie } from "../helpers/Helpers";

const token = getCookie("token"); // GET TOKEN FROM COOKIE
export const BASE_URL = "http://192.168.1.1:8000"; // BASE URL

// API FUNCTION
export const api = apiGenerator({ token, baseURL: BASE_URL });

// API PATHS
export const APIS = {
  sample: "/sample",
};
