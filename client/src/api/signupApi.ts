// import axios from 'axios';
import { request } from '../utils/axiosConfig';
import { AxiosError, AxiosResponse } from 'axios';

interface SignupArgs {
  username: string;
  userId: string;
  password: string;
  avatarLink: string;
  setErrors: any;
}

const handleSignup = async ({
  username,
  userId,
  password,
  avatarLink,
  setErrors,
}: SignupArgs) => {
  try {
    const res = await request.post(`/api/signup`, {
      username,
      userId,
      password,
      avatarLink,
    });
    console.log(res);
    if (res) return res;
  } catch (error: any) {
    alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    console.log('signup error', error);
    console.log('error status', error?.response?.status);
    setErrors(error.message);
    throw error;
  }
};

export default handleSignup;
