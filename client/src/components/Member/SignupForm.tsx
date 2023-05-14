import { useState, useEffect } from "react";
import SignupInput from "../Member/SignupInput";
import Agreement from "./SignupAgreement";
import ModalCharacter from "../modals/ModalCharacter";
import {
  ErrorMessage,
  FormBox,
  PasswordText,
  SignButton,
} from "../../styles/SignupStyle";
import {
  checkId,
  checkPassword,
  checkUsername,
  confirmPassword,
} from "../../utils/checkSignup";
import useCheck from "../../hooks/useCheck";
import handleSignup from "../../api/signupApi";

const SignupForm: React.FC = () => {
  const SIGNUP_URL = `http://localhost:3000/user`;

  const [isOpen, setIsOpen] = useState(false);

  const [displayname, setDisplayname] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setErrors] = useState("");

  const [isDisplayname, setIsDisplayname] = useState(false);
  const [isUserId, setIsUserId] = useState(false);
  const [ispassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setPassWordConfirm] = useState(false);

  useCheck(checkUsername, displayname, setIsDisplayname);
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
    handleSignup({
      SIGNUP_URL,
      displayname,
      userId,
      password,
      setErrors,
    });
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
          value={displayname}
          setValue={setDisplayname}
          setErrors={setErrors}
        />
        {isDisplayname === true ? null : <p>디스플레이 네임을 입력해주세요.</p>}
        <SignupInput
          labelName="ID (email)"
          type="text"
          value={userId}
          setValue={setUserId}
          setErrors={setErrors}
        />
        {isUserId === true ? null : <p>아이디를 입력해주세요.</p>}
        <SignupInput
          labelName="Password"
          type="password"
          value={password}
          setValue={setPassword}
          setErrors={setErrors}
        />
        {ispassword === true ? null : <p>비밀번호를 입력해주세요.</p>}
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
          <p>비밀번호가 일치하지 않습니다.</p>
        )}
        {isUserId &&
          isDisplayname &&
          ispassword &&
          password2.length !== 0 &&
          isPasswordConfirm ?(
            <SignButton type="button" onClick={handleSubmit}>
          Sign up
        </SignButton>
          ) :( <SignButton type="button">
          Sign up
        </SignButton>)}
        <ModalCharacter isOpen={isOpen} setIsOpen={setIsOpen} />
      </form>
    </FormBox>
  );
};

export default SignupForm;
