import styled from "styled-components";

export const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
`;

export const SignupBox = styled.div`
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
`;
export const ButtonBox = styled.div`
  margin-bottom: 15px;
  width: 90%;
  height: 37px;
  margin-top: 3%;
  border: 1px solid #blue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 18px;
  }
`;
export const FormBox = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  border-radius: 5px;
`;

export const PasswordText = styled.p`
  font-size: 13px;
  color: #727981;
`;

export const SignButton = styled.button`
  width: 240px;
  height: 37px;
  margin: 6px 0;
  border-radius: 20px;
  color: #fff;
  border: none;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  label {
    text-align: center;
    margin: 2px 0;
    font-size: 21px;
    font-weight: 600;
  }
  input {
    margin: 2px 0;
    height: 30px;
    border-bottom: 1px solid #c9ad6e;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
  }
`;
