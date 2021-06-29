import Cookies from 'universal-cookie';

const axios = require('axios');
const cookies = new Cookies();
const API_PORT = process.env.REACT_APP_API_PORT;
const API_IP = process.env.REACT_APP_API_IP;
const instance = axios.create({
  baseURL: `http://${API_IP}:${API_PORT}`,
});

function createAxiosRequestInterceptors(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = cookies.get('token');
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
      if (error.response.status === 403 || error.response.status === 401) {
        cookies.remove('token');
        window.location.href = '/login';
      }
    }
  );
}

createAxiosRequestInterceptors(instance);
createAxiosResponseInterceptors(instance);

export default instance;
