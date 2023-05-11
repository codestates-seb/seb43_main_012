import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import OAuthButton from '../OAuthButton';
import { LoginWrapper, SignupLink, LoginView} from '../../styles/LoginStyle';
import LoginForm from '../LoginForm';
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
    <LoginWrapper>
      {isOpen && (
        <ModalBackdrop onClick={closeModalHandler}>
          <LoginView onClick={(e) => e.stopPropagation()}>
            <OAuthButton buttonText="Log in with Google" brand="google" />
            <OAuthButton buttonText="Log in with KakaoTalk" brand="kakaotalk" />
            <LoginForm />
            <SignupLink>
              <span>아직 회원이 아니신가요?</span>
              <Link to="/signup">Sign up</Link>
            </SignupLink>
          </LoginView>
        </ModalBackdrop>
      )}
    </LoginWrapper>
  );
}

export default ModalLogin;
