import styled from 'styled-components';

// 회원가입 페이지 container
export const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  overflow-y: scroll;
  background-color: #fff;
  h3 {
    color: #c9ad6e;
  }
`;

// 회원가입 입력창, 버튼 감싸는 박스
export const SignupBox = styled.div`
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 5%;
  width: 290px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff5de;
`;

//OAuth
export const ButtonBox = styled.div`
  display: flex;
  margin-bottom: 1.5%;
  width: 100%;
  width: 200px;
  height: 37px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f8f9f9;
  }
  img {
    width: 18px;
  }
  button {
    padding: 1.5%;
    border: none;
    background-color: transparent;
    font-size: 13px;
    cursor: pointer;
  }
`;

// 입력창, 가입버튼을 감싸는 박스
export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 10% 0 10%;
  border-radius: 5px;
`;

export const Formform = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & div {
    display: flex;
    justify-content: center;
    min-width: 150px;
    padding 0;
    height: fit-content;
  }
`;
//비밀번호 안내 문구
export const PasswordText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 11px;
  color: #727981;
  word-break: keep-all;
`;

// 가입버튼
export const SignButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 37px;
  // margin: 10%;
  margin-bottom: 10%;
  background: #c9ad6e;
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e7cc8f;
  }
`;

// 입력창
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 6% 0;
  width: 100%;
  max-width: 180px;
  label {
    text-align: center;
    margin: 0.5% 0;
    font-size: 15px;
    font-weight: 600;
  }
  input {
    text-align: center;
    background-color: #fff5de;
    margin: 0.5% 0;
    height: 30px;
    border-bottom: 1px solid #c9ad6e;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    &:focus {
      outline: none;
      border-bottom: 2px solid #77ad69;
    }
`;

//회원가입 동의 박스
export const AgreementBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 3% 0;
  font-size: 13px;
  input {
    margin-right: 1.5%;
  }
`;

export const Box = styled.div`
  display: flex;
  width: 100vw;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

export const ErrorMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 11px;
  color: #913535;
  max-width: 200px;
  word-break: keep-all;
  margin: 0;
  padding: 0;
  &.error {
    margin-bottom: 10px;
    margin-top: 0px;
  }

  .margin-top {
    margin-top: 10px;
  }
`;
