import axios from 'axios';
import { request } from '../utils/axiosConfig';
import { left } from '@popperjs/core';
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
    identifier: userId,
    password,
  });
  if (res.status !== 200) throw new Error(res.data.message);
  const cookies = res.headers['set-cookie'];
  if (cookies) {
    const sessionId = extractSessionIdFromCookies(cookies);
    sessionStorage.setItem('sessionId', sessionId);
  }
  // cannot access headers
  // const token = res.headers['Authorization'];
  // const headers = res.headers;
  // console.log('JWT Token:', token);
  // console.log('headers:', headers);
  // console.log('body', res.data);
  // console.log(headers['cache-control']);
  localStorage.setItem('token', res.data.Authorization);
  localStorage.setItem('refresh', res.data.Refresh);
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
