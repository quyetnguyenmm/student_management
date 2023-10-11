import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://js-post-api.herokuapp.com/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosClient;
