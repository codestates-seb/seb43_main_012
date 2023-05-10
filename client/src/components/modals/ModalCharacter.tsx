import { ReactElement } from "react";
import { CharacterWrapper } from "../../styles/CharacterStyle";

type ModalLoginProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ModalLogin({ isOpen, setIsOpen }: ModalLoginProps): ReactElement {
  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <CharacterWrapper>
      {isOpen ? (
        <div>
          <h1>로그인 모달</h1>
          <button onClick={closeModalHandler}>닫기</button>
        </div>
      ) : null}
    </CharacterWrapper>
  );
}

export default ModalLogin;
