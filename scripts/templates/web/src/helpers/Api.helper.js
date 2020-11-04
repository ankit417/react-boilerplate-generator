import axios from "axios";

export function apiGenerator({ token, baseURL }) {
  return async function api(url, method, body, apiConfig) {
    const config = {
      method: "GET",
      baseURL,
      url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (method) config.method = method;
    if (body) config.data = body;
    if (apiConfig?.headers) config.headers = apiConfig.headers;

    // For file
    if (apiConfig?.file) {
      config.headers = {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      };
      // FOR UPLOAD
      config.onUploadProgress = function (progressEvent) {
        let progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        apiConfig?.fileUploadProgress && apiConfig.fileUploadProgress(progress);
      };
      // FOR DOWNLOAD
      config.onDownloadProgress = function (progressEvent) {
        let progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        apiConfig?.fileDownloadProgress &&
          apiConfig.fileDownloadProgress(progress);
      };
    }

    let response;
    try {
      response = await axios(config);
      return response;
    } catch (e) {
      return new Error(e.response.data.message || e.response.data || e.message);
    }
  };
}
