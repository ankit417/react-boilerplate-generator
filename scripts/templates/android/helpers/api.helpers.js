import axios from "axios";
import { BASE_URL } from "../config";

export async function api(
  url, 
  method, 
  body, 
  headers
) {
  const config = {
    method: "GET",
    baseURL: BASE_URL,
    url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if(headers) {
    config.headers = headers;
  }

  if(method) {
    config.method = method;
  }

  if(body) {
    config.data = body;
  }

  let response;
  try {
    response = await axios(config);
    return response.data;
  } catch(e) {
    return new Error(e.response.data.message || e.response.data || e.message);
  }
}