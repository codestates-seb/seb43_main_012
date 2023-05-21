import axios from 'axios';
import { request } from '../utils/axiosConfig';
import { left } from '@popperjs/core';
interface LoginArgs {
  userId: string;
  password: string;
  setErrors: any;
}

function isValidEmail(email: string): boolean {
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const handleLogin = async ({
  userId,
  password,
  setErrors,
}: LoginArgs) => {
  let key: string = '';
  if (!isValidEmail(userId)) {
    console.log('its displayname');
    key = 'username';
  } else {
    console.log('its email');
    key = 'userId';
  }
  const res = await request.post(`/api/login`, {
    [key]: userId,
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
