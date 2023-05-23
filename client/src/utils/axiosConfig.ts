//axios configurations
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
// const LOCALHOST = import.meta.env.VITE_LOCALHOST;

let token = localStorage.getItem('token');

//NGROK: 인증 필요 없는 GET 요청
const axiosApi = (url: string, options?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    timeout: 5000,
    ...options,
  });
  return instance;
};

//non-ngrok get 요청
const axiosApi2 = (
  url: string,
  options?: AxiosRequestConfig,
): AxiosInstance => {
  if (!token) token = localStorage.getItem('token');
  const instance = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      Authorization: token,
    },
    timeout: 10000,
    ...options,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');

      if (!!token) {
        config.headers.Authorization = token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return instance;
};

export const request = axiosApi(BASE_URL);
export const requestAuth = axiosApi2(BASE_URL);

// requestAuth.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');

//     if (!!token) {
//       config.headers.Authorization = token;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// 응답 에러 처리 인터셉터
// requestAuth.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// requestAuth.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (!!token) {
//       config.headers.Authorization = token;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// requestAuth.interceptors.response.use(
//   (res: AxiosResponse) => {
//     return res;
//   },
//   async (err) => {
//     const _err = err as unknown as AxiosError;
//     const { response } = _err;
//     const originalConfig = _err?.config;

//     if (response && response.status === 401) {
//       const userId = sessionStorage.getItem('user');
//       const refresh = sessionStorage.getItem('refresh');
//       if (!!refresh === false) {
//         throw new Error('리프레시 토큰 삭제 또는 만료됨');
//       } else {
//         if (!!userId) {
//           try {
//             const userIdaddr = JSON.parse(userId);
//             const data = await request.get(`/api/login`, {
//               headers: {
//                 RefreshToken: refresh,
//                 userId: userIdaddr['userId'],
//               },
//             });
//             if (data && originalConfig) {
//               localStorage.setItem('token', data.headers['authorization']);
//               sessionStorage.setItem('refresh', data.headers['refresh']);
//               return await requestAuth.request(originalConfig);
//             }
//           } catch (err) {
//             const _err = err as unknown as AxiosError;
//             console.log(_err?.config?.data);
//           }
//         }
//       }
//     }
//     return Promise.reject(err);
//   },
// );
