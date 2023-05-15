import axios from 'axios';
import { request, requestAuth } from './request';


interface SignupArgs {
  SIGNUP_URL: string;
  username: string;
  userId: string;
  password: string;
  setErrors: any;
}

const handleSignup = async ({
  SIGNUP_URL,
  username,
  userId,
  password,
  setErrors,
}: SignupArgs) => {
  try {
    const res = await requestAuth.post(`/api/signup`, {
      username,
      userId,
      password,
    });
    window.location.replace('/login');
  } catch (error) {
    setErrors(error);
  }
};

export default handleSignup;
