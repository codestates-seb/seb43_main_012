import axios, { AxiosError, AxiosResponse } from 'axios';

export const request = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export const requestAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    Authorization: localStorage.getItem('token'),
  },
  timeout: 30000,
});

requestAuth.interceptors.request.use(
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

// 응답 에러 처리 인터셉터
requestAuth.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

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
