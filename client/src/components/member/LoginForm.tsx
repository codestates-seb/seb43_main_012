import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from '../../styles/LoginStyle';
import SignupInput from '../member/SignupInput';
import { ErrorMessage, SignButton } from '../../styles/SignupStyle';
import { handleLogin } from '../../api/loginApi';
import { UserInfoItemTypes, handleUserInfo } from '../../api/MemberApi';

import { useAppDispatch } from '../../app/hooks';
import {
  changeLoginState,
  updateMemberInfo,
} from '../../features/member/loginInfoSlice';

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
};

function containsAtSymbol(input: string): boolean {
  const regex = /@/;
  return regex.test(input);
}

function isValidEmail(email: string): boolean {
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isValidPassword(password: string): boolean {
  return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/.test(password);
}

function formatDateTime(arr: number[]) {
  // Please note that JavaScript counts months from 0 (January) to 11 (December),
  // so we subtract 1 from the month.
  let date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  return date.toLocaleDateString('default', {
    year: 'numeric',
    month: 'short',
  });
}

const LoginForm = ({ setIsLoggedIn, closeModal }: Props) => {
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isValidInput = ({ id, pw }: { id: string; pw: string }): boolean => {
    if (!userId.length) {
      setErrors('아이디 또는 이메일을 입력해주세요');
      return false;
    }

    if (!password.length) {
      setErrors('비밀번호를 입력해주세요');
      return false;
    }

    if (!containsAtSymbol(id)) {
      setErrors('이메일 주소를 입력해주세요.');
      return false;
    }
    if (!isValidEmail(id)) {
      setErrors('이메일 주소를 확인해주세요.');
      return false;
    }

    if (!isValidPassword(pw)) {
      setErrors(
        '비밀번호는 8자리 이상이어야 하며, 영문,숫자,특수문자 모두 포함해야 합니다',
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidInput({ id: userId, pw: password })) return;

    try {
      const res = await handleLogin({ userId, password, setErrors });
      if (res.status === 200) {
        setIsLoggedIn(true);
        console.log(localStorage.getItem('token'));

        //리덕스 state 업데이트
        if (localStorage.getItem('memberId')) {
          const mId = localStorage.getItem('memberId');
          const userData: UserInfoItemTypes = await handleUserInfo(
            `user/${mId}`,
          );
          console.log(formatDateTime(userData.createdAt));
          dispatch(
            updateMemberInfo({
              userId: userData.id,
              userEmail: userData.userId,
              username: userData.username,
              avatarLink: userData.avatarLink,
              createdDate: formatDateTime(userData.createdAt),
            }),
          );
          dispatch(changeLoginState('ON'));
        }
        closeModal();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setErrors('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
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
          inputType="id"
        />
        <SignupInput
          labelName="Password"
          value={password}
          setValue={setPassword}
          type="password"
          setErrors={setErrors}
          placeholder="영어+숫자+특수문자 8글자"
          inputType="pw"
        />
        {errors.length !== 0 ? <ErrorMessage>{errors}</ErrorMessage> : null}
        <SignButton type="submit">Log in</SignButton>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
