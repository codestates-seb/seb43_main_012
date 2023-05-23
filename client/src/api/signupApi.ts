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
    if (error.response.status === 400) {
      alert('중복되는 유저네임입니다.');
    } else if (error.response.status === 409) {
      alert('이미 가입한 이메일입니다.');
    } else {
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
    setErrors(error.message);
    throw error;
  }
};

export default handleSignup;
