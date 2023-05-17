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
  
    const res = await requestAuth.post(`/api/signup`, {
      username,
      userId,
      password,
      avatarLink,

    });
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default handleSignup;
