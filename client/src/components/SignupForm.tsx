import { FormBox, PasswordText, SignButton } from "../styles/SignupStyle";
import SignupInput from "../components/SignupInput";


const SignupForm: React.FC = () => {
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
        <SignupInput labelName="agreement" inputType="checkbox" />
        <SignButton type="submit">Sign up</SignButton>
      </form>
    </FormBox>
  );
};

export default SignupForm;
