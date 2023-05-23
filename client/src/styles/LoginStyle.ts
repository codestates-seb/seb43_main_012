import styled from 'styled-components';

export const LoginBox = styled.div`
  display: flex;
`;

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
`;

export const LoginView = styled.div`
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  margin-top: 2%;
  margin-bottom: 5%;
  height: 40%;
  width: 290px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff5de;
`;

export const SignupLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  font-size: 14px;

  a {
    margin-left: 5px;
    text-decoration: underline;
  }

  a:hover {
    font-weight: 600;
  }
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  background-color: #fff5de;
  border-radius: 5px;
  input {
    display: flex;
    justify-content: center;
    min-width: 180px;
    text-align: center;
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 1px;
  display: flex;
  align-items: center;
`;

export const SignupText = styled.p``;
export const SignupLinkText = styled.a``;
