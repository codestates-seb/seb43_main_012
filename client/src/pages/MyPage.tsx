import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalEdit from '../components/modals/ModalEdit';
import { MyPageWrapper, MyData } from '../styles/MyPageStyle';
import { MainCharacter } from '../styles/CharacterStyle';
import { handleUserInfo, UserInfoItemTypes } from '../api/MemberApi';

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const Id = localStorage.getItem('memberId');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData: UserInfoItemTypes = await handleUserInfo(`user/${Id}`);
        setAvatarLink(userData.avatarLink); // avatarLink에 값 설정
        setUsername(userData.username); // username 값 설정
        setUserId(userData.userId); // userId 값 설정
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [Id]);

  const email = userId;
  const displayName = username;
  const profileimg = avatarLink;

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const buttonClick = () => {
    alert('회원 정보를 삭제합니다.');
    navigate('/');
  };

  return (
    <MyPageWrapper>
      <MainCharacter>
        {setAvatarLink === setUsername ? (
          displayName[0]
        ) : (
          <img src={profileimg} alt="" />
        )}
      </MainCharacter>
      <div className="modalbutton">
        <button onClick={handleClick}>프로필 편집</button>
        <ModalEdit isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <MyData>{email}</MyData>
      <MyData>{`DisplayName: ${displayName}`}</MyData>
      <div className="downbutton">
        <Link to="/">
          <button>로그아웃</button>
        </Link>
        <button onClick={buttonClick}>회원탈퇴</button>
      </div>
    </MyPageWrapper>
  );
}

export default MyPage;
