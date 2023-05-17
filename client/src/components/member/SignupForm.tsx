import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupInput from "../member/SignupInput";
import {
  ErrorMessage,
  FormBox,
  PasswordText,
  SignButton,
} from '../../styles/SignupStyle';
import {
  checkId,
  checkPassword,
  checkUsername,
  confirmPassword,
} from "../../utils/checkSignup";
import useCheck from "../../hooks/useCheck";
import handleSignup from "../../api/signupApi";
import { getRandomCharacter } from "./RandomCharcter";

const SignupForm: React.FC = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);


  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setErrors] = useState('');

  const [isUsername, setIsUsername] = useState(false);
  const [isUserId, setIsUserId] = useState(false);
  const [ispassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setPassWordConfirm] = useState(false);

  useCheck(checkUsername, username, setIsUsername);
  useCheck(checkId, userId, setIsUserId);
  useCheck(checkPassword, password, setIsPassword);

  useEffect(() => {
    if (confirmPassword(password, password2) === false) {
      setPassWordConfirm(false);
    } else if (confirmPassword(password, password2) === true) {
      setPassWordConfirm(true);
    }
  }, [password2]);

  const handleSubmit = () => {
    const avatarLink = getRandomCharacter();

    try{
      handleSignup({
      username,
      userId,
      password,
      avatarLink,
      setErrors,
    });
    handleClick();
    navigate("/login");
  }
    catch{
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FormBox>
      <form>
        <SignupInput
          labelName="Display name"
          type="text"
          value={username}
          setValue={setUsername}
          setErrors={setErrors}
        />
        {isUsername === true ? null : (
          <ErrorMessage>디스플레이 네임을 입력해주세요.</ErrorMessage>
        )}
        <SignupInput
          labelName="ID (email)"
          type="text"
          value={userId}
          setValue={setUserId}
          setErrors={setErrors}
        />
        {isUserId === true ? null : (
          <ErrorMessage>아이디를 입력해주세요.</ErrorMessage>
        )}
        <SignupInput
          labelName="Password"
          type="password"
          value={password}
          setValue={setPassword}
          setErrors={setErrors}
        />
        {ispassword === true ? null : (
          <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>
        )}
        <PasswordText>
          Passwords must contain at least eight characters, including at least 1
          letter and 1 number.
        </PasswordText>

        <SignupInput
          labelName="Confirm Password"
          type="password"
          value={password2}
          setValue={setPassword2}
          setErrors={setErrors}
        />
        {isPasswordConfirm === true ? null : (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        {isUserId &&
          isUsername &&
          ispassword &&
          password2.length !== 0 &&
          isPasswordConfirm ?(
            <SignButton type="button" onClick={handleSubmit}>
          Sign up
        </SignButton>
          ) :( <SignButton type="button">
          Sign up
        </SignButton>)}
      </form>
    </FormBox>
  );
};

export default SignupForm;
