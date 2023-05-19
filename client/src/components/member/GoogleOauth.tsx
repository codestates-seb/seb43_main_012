import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


// 구글 오어스 연결 부분, 연결 다 되어있음
// 리디렉션 URI가 http://localhost:3000으로 되어있음 >> 호스팅하고 그 URI로 변경해야함
// 각자에게 이걸 사용할 수 있도록 이메일 보내놨고, 확인하면 이용가능 (리디렉션 변경 필요)

const GoogleLoginButton = () => {
  const clientId = `${import.meta.env.VITE_ClientID}`;
  const navigate = useNavigate();

  // 성공하면 메인화면으로 들어감 >> 여기에 서버에게 보낼 Post 요청 필요, request.tsx or signupApi.ts 사용
  const handleSuccess = (res:any) => {
    console.log(res);
    const userInfo = jwtDecode(res.credential);
    console.log(userInfo);
    navigate('/');
  };

  return (
    <GoogleOAuthProvider clientId={clientId} >
      <GoogleLogin onSuccess={handleSuccess} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

