import { useState } from 'react';
import SignupInput from "../components/SignupInput";
import Agreement from "./SignupAgreement";
import ModalCharacter from './modals/ModalCharacter';
import { FormBox, PasswordText, SignButton } from "../styles/SignupStyle";


const SignupForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <FormBox>
      <form>
        <SignupInput labelName="Display name" inputType="text" />
        <SignupInput labelName="Email" inputType="email" />
        <SignupInput labelName="Password" inputType="password" />
        <PasswordText>
          Passwords must contain at least eight characters, including at least 1
          letter and 1 number.
        </PasswordText>
        <SignupInput labelName="Confirm Password" inputType="password" />
        <Agreement labelName="회원 가입에 동의합니다." inputType="checkbox" />
        <SignButton type="button" onClick={handleClick}>Sign up</SignButton>
        <ModalCharacter isOpen = {isOpen} setIsOpen = {setIsOpen} />
      </form>
    </FormBox>
  );
};

export default SignupForm;
