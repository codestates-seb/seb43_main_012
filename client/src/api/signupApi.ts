import axios from "axios";

interface SignupArgs {
  SIGNUP_URL: string;
  displayname: string;
  userId: string;
  password: string;
  setErrors: any;
}


const handleSignup = async ({
  SIGNUP_URL,
  displayname,
  userId,
  password,
  setErrors,
}: SignupArgs) => {
  try {
    const res = await axios.post(SIGNUP_URL, {
      displayname,
      userId,
      password,
    });
    window.location.replace("/login");
  } catch (error) {
    setErrors(error);
  }
};

export default handleSignup;
