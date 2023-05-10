import { ReactElement } from "react";
import { LoginWrapper } from "../../styles/LoginStyle";

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
      {isOpen ? (
        <div>
          <h1>로그인 모달</h1>
          <button onClick={closeModalHandler}>닫기</button>
        </div>
      ) : null}
    </LoginWrapper>
  );
}

export default ModalLogin;
