import axios, { AxiosError, AxiosResponse } from 'axios';

export const request = axios.create({
  baseURL: `https://71fc-118-33-155-37.ngrok-free.app/`,
});

export const requestAuth = axios.create({
  baseURL: `https://71fc-118-33-155-37.ngrok-free.app/`,
  headers: {
    'Content-type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    Authorization: sessionStorage.getItem('token'),
  },
  timeout: 30000,
});

requestAuth.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');

    if (!!token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

requestAuth.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  async (err) => {
    const _err = err as unknown as AxiosError;
    const { response } = _err;
    const originalConfig = _err?.config;

    if (response && response.status === 401) {
      const userId = sessionStorage.getItem('user');
      const refresh = sessionStorage.getItem('refresh');
      if (!!refresh === false) {
        throw new Error('리프레시 토큰 삭제 또는 만료됨');
      } else {
        if (!!userId) {
          try {
            const userIdaddr = JSON.parse(userId);
            const data = await request.get(`/api/login`, {
              headers: {
                RefreshToken: refresh,
                userId: userIdaddr['userId'],
              },
            });
            if (data && originalConfig) {
              sessionStorage.setItem('token', data.headers['authorization']);
              sessionStorage.setItem('refresh', data.headers['refresh']);
              return await requestAuth.request(originalConfig);
            }
          } catch (err) {
            const _err = err as unknown as AxiosError;
            console.log(_err?.config?.data);
          }
        }
      }
    }
    return Promise.reject(err);
  },
);
