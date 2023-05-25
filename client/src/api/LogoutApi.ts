import { requestAuth } from '../utils/axiosConfig';

export const userDelete = async (URL: string) => {
  try {
    const response = await requestAuth.delete(`/api/${URL}`);
    const data = await response.data;
    localStorage.clear();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutApi = async (URL: string) => {
  const res = await requestAuth.post(`/api/${URL}`);
  if (res.status !== 200) throw new Error(res.data.message || 'logout error');
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.clear();
  return res;
};
