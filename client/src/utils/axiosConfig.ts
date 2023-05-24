//axios configurations
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { logoutApi } from '../api/LogoutApi';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const APP_URL = import.meta.env.VITE_APP_URL;

let token = localStorage.getItem('token');
axios.defaults.withCredentials = true;

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
      'Access-Control-Allow-Origin': APP_URL,
      Authorization: token,
    },
    timeout: 30000,
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

  // 응답 에러 처리 인터셉터
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // instance.interceptors.response.use(
  //   (res: AxiosResponse) => {
  //     console.log('axios response', res);
  //     return res;
  //   },
  //   async (err) => {
  //     console.log('refresh intercept');
  //     const _err = err as unknown as AxiosError;
  //     const { response } = _err;
  //     const originalRequestConfig = _err?.config;

  //     if (response && response.status === 401) {
  //       const refresh = localStorage.getItem('refresh');
  //       if (!refresh) {
  //         throw new Error('리프레시 토큰 삭제 또는 만료됨');
  //         // localStorage.clear();
  //       } else {
  //         console.log('refresh token 새로 발급받기');
  //         try {
  //           await refreshAccessToken();
  //           if (originalRequestConfig) {
  //             originalRequestConfig.headers.Authorization =
  //               localStorage.getItem('token');
  //             return await requestAuth.request(originalRequestConfig);
  //           }
  //         } catch (err) {
  //           const _err = err as unknown as AxiosError;
  //           console.log(_err?.config?.data);
  //         }
  //       }
  //     }
  //     return Promise.reject(err);
  //   },
  // );

  return instance;
};

export const request = axiosApi(BASE_URL);
export const requestAuth = axiosApi2(BASE_URL);

async function refreshAccessToken() {
  const navigate = useNavigate();
  try {
    const response = await request.post(`/refresh`, {
      refreshToken: localStorage.getItem('refresh'),
    });

    console.log(response.data);
    // Update the access token with the new one
    const accessToken = response.data.Authorization;

    // Update the Authorization header in the Axios instance
    requestAuth.defaults.headers['Authorization'] = accessToken;
    localStorage.setItem('token', accessToken);
    return Promise.resolve();
  } catch (error: any) {
    // Handle the refresh token request error
    console.log('Error refreshing access token:', error.message);
    // Perform logout or other error handling actions
    await logoutApi(`logout`);
    navigate(`/`);
    alert('로그아웃 되었습니다.');
  }
}
