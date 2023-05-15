import axios from "axios";
import { request, requestAuth } from "./request";

interface LoginArgs {
  userId: string;
  password: string;
  setErrors: any;
}


export const handleLogin = async ({
  userId,
  password,
  setErrors,
}: LoginArgs) => {
    const res = await requestAuth.post(`/login`, {
      userId,
      password,
    });
    if(res.status !== 200) throw new Error(res.data.message)
    sessionStorage.setItem("token", res.headers["Authorization"]);
    sessionStorage.setItem("refresh", res.headers["refresh"]);
    sessionStorage.setItem("user", JSON.stringify(res.data));
    return res;
  }; 


