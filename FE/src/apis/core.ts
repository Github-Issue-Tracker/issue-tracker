import axios from "axios";

const AUTH_TOKEN = `Bearer token`;

// TODO: baseURLpostman swagger
export const BASE_URL: { [key: string]: string } = {
  development: "http://3.36.122.30:8080",
  production: "",
};

const newAxios = axios.create({
  baseURL: BASE_URL[process.env.NODE_ENV] || BASE_URL.development,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: Read token from localstorage.
newAxios.defaults.headers.common.Authorization = AUTH_TOKEN;

newAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

newAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default newAxios;
