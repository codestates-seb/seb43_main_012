import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  email: string;
  picture: string;
  name: string;

  // 필요한 다른 속성들도 추가할 수 있습니다.
}

const decodeJwtToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY') as DecodedToken;
    return decoded;
  } catch (error) {
    console.error('JWT decoding error:', error);
    return null;
  }
};

// 사용 예시
const token = 'YOUR_JWT_TOKEN';
const decodedToken = decodeJwtToken(token);

if (decodedToken) {
  const email = decodedToken.email;
  // 서버로 email을 전송하는 로직 추가
}
