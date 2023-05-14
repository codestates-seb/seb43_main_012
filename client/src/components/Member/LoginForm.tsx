import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormContainer } from "../../styles/LoginStyle";
import SignupInput from "./SignupInput";
import { ErrorMessage, SignButton } from "../../styles/SignupStyle";
import { handleLogin } from "../../api/loginApi";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm = ({ setIsLoggedIn }: Props) => {
  const handleLoginClick = () => {
    console.log("login click!");
    setIsLoggedIn(true);
  };

  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin({ userId, password, setErrors });
  };

  return (
    <FormContainer onClick={handleLoginClick}>
      <form onSubmit={handleSubmit}>
        <SignupInput
          labelName="ID (email)"
          value={userId}
          setValue={setuserId}
          setErrors={setErrors}
        />
        <SignupInput
          labelName="Password"
          value={password}
          setValue={setPassword}
          type="password"
          setErrors={setErrors}
        />
        {errors.length !== 0 ? (
          <ErrorMessage>아이디 또는 비밀번호를 잘못 입력하셨습니다.</ErrorMessage>
        ) : null}
        {/* <Link to="/"> */}
        <SignButton>Log in</SignButton>
        {/* </Link> */}
      </form>
    </FormContainer>
  );
};

export default LoginForm;
