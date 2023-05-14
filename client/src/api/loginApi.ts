import axios from "axios";

interface LoginArgs {
  userId: string;
  password: string;
  setErrors: any;
}

const LOGIN_URL = `http://localhost:3000/login`;

export const handleLogin = async ({
  userId,
  password,
  setErrors,
}: LoginArgs) => {
  try {
    const res = await axios.post(LOGIN_URL, {
      userId,
      password,
    });
    localStorage.setItem("token", res.headers["access-token"]);
    window.location.replace("/");
  } catch (error) {
    setErrors(error);
  }
};

