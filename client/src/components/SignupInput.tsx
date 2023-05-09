import { InputBox } from "../styles/SignupStyle";

interface SignupInputProps {
  labelName: string;
  inputType: string;
}

// OAuthButton 컴포넌트를 함수형 컴포넌트로 선언(리액트 컴포넌트)
const SignupInput: React.FC<SignupInputProps> = ({ labelName, inputType }) => {
  return (
    <InputBox>
      <label>{labelName}</label>
      <input type={inputType} />
    </InputBox>
  );
};

export default SignupInput;
