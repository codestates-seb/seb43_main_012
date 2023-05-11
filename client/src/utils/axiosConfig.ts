//axios configurations
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8080";

// 인증 필요 없는 GET 요청
const axiosApi = (url: string, options?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
    headers: {
      "ngrok-skip-browser-warning": "69420",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    ...options,
  });
  return instance;
};

//post, delete등 api요청 시 인증값(토큰)이 필요한 경우
//ngrok 우회설정 + 인증값(토큰)이 필요한 경우

export const axiosDefault = axiosApi(BASE_URL);
