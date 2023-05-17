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
export const ButtonBox = styled.button`
  margin-bottom: 1.5%;
  width: 259px;
  height: 37px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  background-color: #fff;
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
  padding: 0 10% 0 10%;
  border-radius: 5px;
`;

//비밀번호 안내 문구
export const PasswordText = styled.p`
  text-align: left;
  font-size: 11px;
  color: #727981;
`;

// 가입버튼
export const SignButton = styled.button`
  width: 80%;
  height: 37px;
  margin: 10% 0 10% 10%;
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
  margin: 6% 0;
  label {
    text-align: center;
    margin: 0.5% 0;
    font-size: 15px;
    font-weight: 600;
  }
  input {
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
  font-size: 11px;
  color: #913535;
`
