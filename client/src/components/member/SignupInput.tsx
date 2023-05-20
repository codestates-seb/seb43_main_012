import { InputBox } from '../../styles/SignupStyle';

interface SignupInputProps {
  labelName: string;
  className?: string;
  type?: string;
  value: string;
  error?: string | undefined;
  setValue: (str: string) => void;
  setErrors: (str: string) => void;
  placehorder?:string;
}

// OAuthButton 컴포넌트를 함수형 컴포넌트로 선언(리액트 컴포넌트)
const SignupInput: React.FC<SignupInputProps> = ({
  labelName,
  type = 'text',
  error,
  value,
  placehorder,
  setValue,
  setErrors,
}) => {
  const resetInputClick = () => {
    setErrors('');
    setValue('');
  };

  return (
    <InputBox>
      <label>{labelName}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={resetInputClick}
        className="input"
        placeholder={placehorder}
      />
      <small> {error} </small>
    </InputBox>
  );
};

export default SignupInput;
