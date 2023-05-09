import { ButtonBox } from "../styles/SignupStyle";

// 인터페이스로 각자의 타입을 지정
interface OAuthButtonProps {
  buttonText: string;
  brand: string;
}

// OAuthButton 컴포넌트를 함수형 컴포넌트로 선언(리액트 컴포넌트)
const OAuthButton: React.FC<OAuthButtonProps> = ({ buttonText, brand }) => {
  const buttonClick = () => {
    alert("서비스 준비중입니다");
  };
  return (
    <ButtonBox onClick={() => buttonClick()}>
      <img src={`/${brand}_logo_icon.png`} alt="" />
      <button type="button">{buttonText}</button>
    </ButtonBox>
  );
};

export default OAuthButton;
