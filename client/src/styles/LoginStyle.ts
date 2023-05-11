import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 620.531px;
  height: 100%;
  width: 100vw;
  background-color: var(--base-color);
`;

export const LoginView = styled.div`
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 330px;
  margin-top: 2%;
  margin-bottom: 5%;
  height: 60%;
  width: 100vw;
  max-width: 290px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff5de;
`;

export const SignupLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 16px;
  font-size: var(--font-base);
  a {
    color: var(--main-color);
  }
`;
export const FormContainer = styled.div`
  padding: 24px;
  background-color: #fff5de;
  border-radius: 5px;
`;

export const ErrorMessage = styled.p`
  margin-top: 1px;
  display: flex;
  align-items: center;
  font-size: var(--font-small);
  color: var(--error-message-color);
`;
