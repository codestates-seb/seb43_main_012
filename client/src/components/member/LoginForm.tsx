import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from '../../styles/LoginStyle';
import SignupInput from '../member/SignupInput';
import { ErrorMessage, SignButton, Formform } from '../../styles/SignupStyle';
import { handleLogin } from '../../api/loginApi';
import { UserInfoItemTypes, handleUserInfo } from '../../api/MemberApi';
import { containsAtSymbol, isValidEmail } from '../../utils/checkLogin';

import { useAppDispatch } from '../../app/hooks';
import {
  changeLoginState,
  updateMemberInfo,
} from '../../features/member/loginInfoSlice';

const GuestButton = styled(SignButton)`
  background: var(--color-default-green);
  min-width: 120px;

  &:hover {
    background: var(--color-default-darkgreen);
  }
`;

type Props = {
  closeModal: () => void;
};

export function formatDateTime(arr: number[]) {
  // JavaScript counts months from 0 (January) to 11 (December),
  // so we subtract 1 from the month.
  let date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
  return date.toLocaleDateString('default', {
    year: 'numeric',
    month: 'short',
  });
}

const LoginForm = ({ closeModal }: Props) => {
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

    if (containsAtSymbol(id) && !isValidEmail(id)) {
      setErrors('이메일 주소를 확인해주세요.');
      return false;
    }

    return true;
  };

  const guestLogin = async (event: any) => {
    event.preventDefault();
    try {
      const res = await handleLogin({
        userId: 'guest',
        password: 'Guest123!',
        setErrors,
      });
      if (res.status === 200) {
        //리덕스 state 업데이트
        if (localStorage.getItem('memberId')) {
          const mId = localStorage.getItem('memberId');
          const userData: UserInfoItemTypes = await handleUserInfo(
            `user/${mId}`,
          );
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
    } catch (error: any) {
      console.log(error);
      console.log('error status: ', error.response.status);
      setErrors('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidInput({ id: userId, pw: password })) return;

    try {
      const res = await handleLogin({ userId, password, setErrors });
      if (res.status === 200) {
        //리덕스 state 업데이트
        if (localStorage.getItem('memberId')) {
          const mId = localStorage.getItem('memberId');
          const userData: UserInfoItemTypes = await handleUserInfo(
            `user/${mId}`,
          );
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
    } catch (error: any) {
      console.log(error);
      console.log('error status: ', error.response.status);
      setErrors('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
    }
  };

  return (
    <FormContainer>
      <Formform onSubmit={handleSubmit}>
        <SignupInput
          labelName="Username / Email"
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
          inputType="pw"
        />
        {errors.length !== 0 ? (
          <ErrorMessage className="error">{errors}</ErrorMessage>
        ) : null}
        <SignButton type="submit">Log in</SignButton>
        <GuestButton onClick={guestLogin}>게스트계정 구경</GuestButton>
      </Formform>
    </FormContainer>
  );
};

export default LoginForm;
