import { Link } from 'react-router-dom';
import { FormContainer } from '../styles/LoginStyle';
import SignupInput from './SignupInput';
import { SignButton } from '../styles/SignupStyle';

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm = ({ setIsLoggedIn }: Props) => {
  const handleLoginClick = () => {
    console.log('login click!');
    setIsLoggedIn(true);
  };
  return (
    <FormContainer onClick={handleLoginClick}>
      <form>
        <SignupInput labelName="ID (email)" inputType="email" />
        <SignupInput labelName="Password" inputType="password" />
        {/* <Link to="/"> */}
        <SignButton>Log in</SignButton>
        {/* </Link> */}
      </form>
    </FormContainer>
  );
};

export default LoginForm;
