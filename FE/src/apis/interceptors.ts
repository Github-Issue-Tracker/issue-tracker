import axios from "axios";

// TODO baseURLpostman swagger
export const BASE_URL: { [key: string]: string } = {
  development: "http://3.36.122.30:8080",
  production: "",
};

const instance = axios.create({
  baseURL: BASE_URL[process.env.NODE_ENV] || BASE_URL.development,
  timeout: 3000,
});

instance.interceptors.request.use(
  (config) => {
    // 요청 성공 직전

    return config;
  },
  (error) => {
    // 요청 에러 직전
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다. 
    */

    return response;
  },
  (error) => {
    // 응답 에러 직전
    console.error(error);
    return Promise.reject(error);
  }
);

export default instance;
