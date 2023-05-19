import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import OAuthButton from '../member/OAuthButton';
import {
  LoginBox,
  LoginWrapper,
  SignupLink,
  LoginView,
} from '../../styles/LoginStyle';
import LoginForm from '../member/LoginForm';
import { ModalBackdrop } from '../../styles/CharacterStyle';

type ModalLoginProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalLogin({
  isOpen,
  setIsOpen,
  setIsLoggedIn,
}: ModalLoginProps): ReactElement {
  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <LoginBox>
      <LoginWrapper>
        {isOpen && (
          <ModalBackdrop onClick={closeModalHandler}>
            <LoginView onClick={(e) => e.stopPropagation()}>
              <OAuthButton buttonText="Log in with Google" brand="google" />
              <OAuthButton
                buttonText="Log in with KakaoTalk"
                brand="kakaotalk"
              />
              <LoginForm
                setIsLoggedIn={setIsLoggedIn}
                closeModal={closeModalHandler}
              />
              <SignupLink>
                <span
                  onClick={(e) => {
                    e.stopPropagation;
                    setIsLoggedIn(true);
                  }}
                >
                  아직 회원이 아니신가요?
                </span>
                <Link to="/signup" onClick={closeModalHandler}>
                  Sign up
                </Link>
              </SignupLink>
            </LoginView>
          </ModalBackdrop>
        )}
      </LoginWrapper>
    </LoginBox>
  );
}

export default ModalLogin;
