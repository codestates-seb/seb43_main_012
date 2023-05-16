import axios from "axios";
import { request, requestAuth } from "./request";

interface SignupArgs {
  username: string;
  userId: string;
  password: string;
  setErrors: any;
}


const handleSignup = async ({
  username,
  userId,
  password,
  setErrors,
}: SignupArgs) => {
  try {
  
    const res = await requestAuth.post((`/api/signup`), {
      username,
      userId,
      password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export default handleSignup;
