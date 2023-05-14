import { SignupBox, SignupWrapper } from "../styles/SignupStyle";
import OAuthButton from "../components/Member/OAuthButton";
import SignupForm from "../components/Member/SignupForm";


function Signup(){


  return (
    <SignupWrapper>
      <h3>JOIN CHARTCRAWL</h3>
      <SignupBox>
        <OAuthButton buttonText="Continue with Google" brand="google" />
        <OAuthButton buttonText="Continue with KakaoTalk" brand="kakaotalk" />
        <SignupForm />
      </SignupBox>
    </SignupWrapper>
  );
};

export default Signup;
