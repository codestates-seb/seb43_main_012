import { SignupBox, SignupWrapper } from '../styles/SignupStyle';
import OAuthButton from '../components/member/OAuthButton';
import GoogleLoginButton from '../components/member/GoogleOauth';
import SignupForm from '../components/member/SignupForm';

function Signup() {
  return (
    <SignupWrapper>
      <h3>JOIN CHATCRAWL</h3>
      <SignupBox>
        <GoogleLoginButton />
        <OAuthButton buttonText="KakaoTalk 계정으로 로그인" brand="kakaotalk" />
        <SignupForm />
      </SignupBox>
    </SignupWrapper>
  );
}

export default Signup;
