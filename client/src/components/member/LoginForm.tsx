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

const LoginForm = ({ setIsLoggedIn, closeModal }: Props) => {
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await handleLogin({ userId, password, setErrors });
      if (res.status === 200) {
        setIsLoggedIn(true);
        console.log(localStorage.getItem('token'));

        if (localStorage.getItem('memberId')) {
          console.log('updating member state');
          const mId = localStorage.getItem('memberId');
          const userData: UserInfoItemTypes = await handleUserInfo(
            `user/${mId}`,
          );
          // console.log(userData);
          const date: number[] = userData.createdAt;
          dispatch(
            updateMemberInfo({
              userId: userData.id,
              userEmail: userData.userId,
              username: userData.username,
              avatarLink: userData.avatarLink,
              createdDate: `${date[1]}.${date[0]}} `,
            }),
          );
          dispatch(changeLoginState('ON'));
        }
        closeModal();
        navigate('/');
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
          placehorder="영어+숫자+특수문자 8글자"
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
