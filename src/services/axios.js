import Cookies from "universal-cookie";

const axios = require("axios");
const cookies = new Cookies();
const API_PORT = process.env.REACT_APP_API_PORT;
const API_IP = process.env.REACT_APP_API_IP;
const instance = axios.create({
  baseURL: `https://${API_IP}:${API_PORT}`,
});

function createAxiosRequestInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = cookies.get("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

function createAxiosResponseInterceptors(axiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const errorStatus = error.response && error.response.status;
      if (errorStatus === 403 || errorStatus === 401) {
        cookies.remove("token");
        window.location.href = "/login";
      }
      throw error;
    }
  );
}

createAxiosRequestInterceptors(instance);
createAxiosResponseInterceptors(instance);

export default instance;
