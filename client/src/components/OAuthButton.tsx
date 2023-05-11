import { useState } from 'react';
import { ButtonBox, ButtonWrapper } from '../styles/SignupStyle';
import ModalDisplayName from './modals/ModalDisplayName';

// 인터페이스로 각자의 타입을 지정
interface OAuthButtonProps {
  buttonText: string;
  brand: string;
}

// OAuthButton 컴포넌트를 함수형 컴포넌트로 선언(리액트 컴포넌트)
const OAuthButton: React.FC<OAuthButtonProps> = ({ buttonText, brand }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // const buttonClick = () => {
  //   alert("서비스 준비중입니다");
  // };

  return (
    <ButtonWrapper>
      <ButtonBox>
        <img src={`/${brand}_logo_icon.png`} alt="" />
        <button type="button" onClick={handleClick}>
          {buttonText}
        </button>
      </ButtonBox>
      <ModalDisplayName isOpen2={isOpen} setIsOpen2={setIsOpen} />
    </ButtonWrapper>
  );
};

export default OAuthButton;
