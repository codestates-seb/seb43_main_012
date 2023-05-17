import axios from 'axios';
import { request, requestAuth } from './request';

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
  const res = await requestAuth.post(`/api/login`, {
    userId,
    password,
  });
  if (res.status !== 200) throw new Error(res.data.message);

  sessionStorage.setItem('token',res.data.authorization);
  sessionStorage.setItem('refresh', JSON.stringify(res.data.refresh));
  localStorage.setItem('memberId', JSON.stringify(res.data.memberId));
  localStorage.setItem('isLoggedIn', 'true');
  return res;
};
