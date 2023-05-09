import { SignupBox, SignupWrapper } from "../styles/SignupStyle";

import OAuthButton from "../components/OAuthButton";
import SignupForm from "../components/SignupForm";

const Signup: React.FC = () => {
  return (
    <SignupWrapper>
      <h2>JOIN CHARTCRAWL</h2>
      <SignupBox>
        <OAuthButton buttonText="Continue with Google" brand="google" />
        <OAuthButton buttonText="Continue with KakaoTalk" brand="kakaotalk" />
        <SignupForm />
      </SignupBox>
    </SignupWrapper>
  );
};

export default Signup;
