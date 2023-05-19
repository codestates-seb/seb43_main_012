//axios configurations
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
const LOCALHOST = `${import.meta.env.VITE_LOCALHOST}`;

//NGROK: 인증 필요 없는 GET 요청
const axiosApi = (url: string, options?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    // timeout: 5000,
    ...options,
  });
  return instance;
};

//non-ngrok get 요청
const axiosApi2 = (
  url: string,
  options?: AxiosRequestConfig,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    // headers: {
    //   "Access-Control-Allow-Origin": "http://localhost:3000",
    // },
    // timeout: 5000,
    ...options,
  });
  return instance;
};

// export const apiDefaultRequest = async <T>(
//   url: string,
//   config: AxiosRequestConfig,
// ): Promise<T> => {
//   try {
//     const response = await axiosApi2(url, config);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

//post, delete등 api요청 시 인증값(토큰)이 필요한 경우
//ngrok 우회설정 + 인증값(토큰)이 필요한 경우

export const axiosNgrok = axiosApi(LOCALHOST);
export const axiosDefault = axiosApi2(BASE_URL);
