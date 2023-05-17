import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer } from "../../styles/LoginStyle";
import SignupInput from "../member/SignupInput";
import { ErrorMessage, SignButton } from "../../styles/SignupStyle";
import { handleLogin } from "../../api/loginApi";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
};

const LoginForm = ({ setIsLoggedIn, closeModal }: Props) => {

  const [userId, setuserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try {
      const res = await handleLogin({ userId, password, setErrors });
      if (res.status === 200) {
        setIsLoggedIn(true);
        console.log(res.data.authorization);
        closeModal();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrors(error as string);
    }
  };

  return (
    <FormContainer>
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
          <ErrorMessage>
            아이디 또는 비밀번호를 잘못 입력하셨습니다.
          </ErrorMessage>
        ) : null}
        <SignButton type="submit">Log in</SignButton>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
