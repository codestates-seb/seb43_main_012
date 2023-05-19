import axios from 'axios';
import { request, requestAuth } from './request';



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
    console.log(res.data);
    return res;
  } catch (error) {
    alert("회원가입에 실패했습니다. 다시 시도해 주세요.")
    console.log(error);
    return error;
  }
};

export default handleSignup;
