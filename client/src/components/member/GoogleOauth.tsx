import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const GoogleLoginButton = () => {
  const clientId = `${import.meta.env.VITE_ClientID}`;
  
  const handleSuccess = (res:any) => {
    console.log(res);
    const userInfo = jwtDecode(res.credential);
    console.log(userInfo);
  };

  return (
    <GoogleOAuthProvider clientId={clientId} >
      <GoogleLogin onSuccess={handleSuccess} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;

