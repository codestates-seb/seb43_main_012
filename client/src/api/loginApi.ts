import axios from 'axios';
import { request, requestAuth } from '../utils/axiosConfig';

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
  const res = await request.post(`/api/login`, {
    userId,
    password,
  });
  if (res.status !== 200) throw new Error(res.data.message);
  const cookies = res.headers['set-cookie'];
  if (cookies) {
    const sessionId = extractSessionIdFromCookies(cookies);
    sessionStorage.setItem('sessionId', sessionId);
  }
  localStorage.setItem('token', res.data.authorization);
  localStorage.setItem('refresh', JSON.stringify(res.data.refresh));
  localStorage.setItem('memberId', JSON.stringify(res.data.memberId));
  localStorage.setItem('isLoggedIn', 'true');
  return res;
};

const extractSessionIdFromCookies = (cookies: string[]) => {
  for (let cookie of cookies) {
    const match = cookie.match(/sessionid=(\w+)/);
    if (match && match.length > 1) {
      return match[1];
    }
  }
  return '';
};
