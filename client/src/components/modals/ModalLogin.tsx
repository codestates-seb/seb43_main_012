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
};

function ModalLogin({ isOpen, setIsOpen }: ModalLoginProps): ReactElement {
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
              <LoginForm closeModal={closeModalHandler} />
              <SignupLink>
                <span>
                  아직 회원이 아니신가요?
                  <Link to="/signup" onClick={closeModalHandler}>
                    회원가입
                  </Link>
                </span>
                <br />
                <span>
                  기존계정 구경: <br />
                  (id) guest, (비번) Guest123!
                </span>
              </SignupLink>
            </LoginView>
          </ModalBackdrop>
        )}
      </LoginWrapper>
    </LoginBox>
  );
}

export default ModalLogin;
