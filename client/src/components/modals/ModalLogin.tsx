import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import OAuthButton from '../OAuthButton';
import { LoginContainer, LoginWrapper, SignupLink } from '../../styles/LoginStyle';
import LoginForm from '../LoginForm';

type ModalLoginProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ModalLogin({ isOpen, setIsOpen }: ModalLoginProps): ReactElement {
  return (
    <LoginContainer>
      {isOpen && (
        <LoginWrapper>
          <OAuthButton buttonText="Log in with Google" brand="google" />
          <OAuthButton buttonText="Log in with KakaoTalk" brand="kakaotalk" />
          <LoginForm />
          <SignupLink>
            <span>아직 회원이 아니신가요?</span>
            <Link to="/signup">Sign up</Link>
          </SignupLink>
        </LoginWrapper>
      )}
    </LoginContainer>
  );
}

export default ModalLogin;
