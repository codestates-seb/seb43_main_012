import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupInput from '../member/SignupInput';
import {
  ErrorMessage,
  FormBox,
  Formform,
  PasswordText,
  SignButton,
} from '../../styles/SignupStyle';
import {
  checkId,
  checkPassword,
  checkUsername,
  confirmPassword,
} from '../../utils/checkSignup';
import useCheck from '../../utils/hooks/useCheck';
import handleSignup from '../../api/signupApi';
import { getRandomCharacter } from './RandomCharcter';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setErrors] = useState('');

  const [isUsername, setIsUsername] = useState(true);
  const [isUserId, setIsUserId] = useState(true);
  const [ispassword, setIsPassword] = useState(true);
  const [isPasswordConfirm, setPassWordConfirm] = useState(false);

  const DisplayErrorMessages = () => {
    useCheck(checkUsername, username, setIsUsername);
    useCheck(checkId, userId, setIsUserId);
    useCheck(checkPassword, password, setIsPassword);
  };

  DisplayErrorMessages();

  useEffect(() => {
    if (confirmPassword(password, password2) === false) {
      setPassWordConfirm(false);
    } else if (confirmPassword(password, password2) === true) {
      setPassWordConfirm(true);
    }
  }, [password2]);

  const handleSubmit = async () => {
    const avatarLink = getRandomCharacter();

    try {
      const res = await handleSignup({
        username,
        userId,
        password,
        avatarLink,
        setErrors,
      });
      if (res?.status === 201) navigate('/login');
    } catch (error) {
      console.log('signup error', error);
    }
  };

  const handleAlert = () => {
    alert('각각의 양식의 맞춰 작성해주세요.');
  };

  return (
    <FormBox>
      <Formform>
        <SignupInput
          labelName="Username"
          type="text"
          value={username}
          setValue={setUsername}
          setErrors={setErrors}
        />
        {isUsername === true ? null : (
          <ErrorMessage>Username을 입력해주세요.</ErrorMessage>
        )}
        <SignupInput
          labelName="E-mail"
          type="text"
          value={userId}
          setValue={setUserId}
          setErrors={setErrors}
        />
        {isUserId === true ? null : (
          <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
        )}
        <SignupInput
          labelName="Password"
          type="password"
          value={password}
          setValue={setPassword}
          setErrors={setErrors}
        />
        {ispassword === true ? null : (
          <ErrorMessage className="error">
            비밀번호를 조건을 확인해주세요.
          </ErrorMessage>
        )}
        <PasswordText>
          <p>비밀번호는 8자 이상이어야 하며,</p>
          <p>대소문자/숫자/특수문자를 모두 포함해야 합니다.</p>
        </PasswordText>

        <SignupInput
          labelName="Confirm Password"
          type="password"
          value={password2}
          setValue={setPassword2}
          setErrors={setErrors}
        />
        {isPasswordConfirm === true ? null : (
          <ErrorMessage className="error">
            비밀번호가 일치하지 않습니다.
          </ErrorMessage>
        )}
        {isUserId &&
        isUsername &&
        ispassword &&
        password2.length !== 0 &&
        isPasswordConfirm ? (
          <SignButton type="button" onClick={handleSubmit}>
            Sign up
          </SignButton>
        ) : (
          <div>
            <SignButton type="button" onClick={handleAlert}>
              Sign up
            </SignButton>
          </div>
        )}
      </Formform>
    </FormBox>
  );
};
export default SignupForm;
