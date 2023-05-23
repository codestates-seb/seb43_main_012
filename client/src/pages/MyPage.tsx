import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalEdit from '../components/modals/ModalEdit';
import { MyPageWrapper, MyData } from '../styles/MyPageStyle';
import { MainCharacter } from '../styles/CharacterStyle';
import { handleUserInfo, UserInfoItemTypes } from '../api/MemberApi';
import { userDelete, logoutApi } from '../api/LogoutApi';
import { useAppDispatch } from '../app/hooks';
import {
  changeLoginState,
  initializeMemberState,
} from '../features/member/loginInfoSlice';
import { initializeConversation } from '../features/main/conversationSlice';

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const Id = localStorage.getItem('memberId');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData: UserInfoItemTypes = await handleUserInfo(`user/${Id}`);
        setAvatarLink(userData.avatarLink); // avatarLink에 값 설정
        setUsername(userData.username); // username 값 설정
        setUserId(userData.userId); // userId 값 설정
        // console.log(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [isOpen]);

  const email = userId;
  const displayName = username;
  const profileimg = avatarLink;

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      await userDelete(`user/${Id}`);
      navigate(`/`);
      dispatch(changeLoginState('OFF'));
      dispatch(initializeMemberState);
      dispatch(initializeConversation(-1));
      alert('회원 탈퇴 되었습니다. 다시 만나요!');
    } catch (error) {
      console.error(error);
      alert('잠시 후 다시 시도해 주세요.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi(`logout`);
      navigate(`/`);
      dispatch(changeLoginState('OFF'));
      dispatch(initializeMemberState);
      dispatch(initializeConversation(-1));
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error(error);
      alert('잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <MyPageWrapper>
      <MainCharacter>
        {avatarLink === username ? (
          displayName[0]
        ) : (
          <img src={avatarLink} alt="" />
        )}
      </MainCharacter>
      <div className="modalbutton">
        <button onClick={handleClick}>프로필 편집</button>
        <ModalEdit isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <MyData>{`Username: ${displayName}`}</MyData>
      <MyData>{email}</MyData>
      <div className="downbutton">
        <button onClick={handleLogout}>로그아웃</button>
        <button onClick={handleDelete}>회원탈퇴</button>
      </div>
    </MyPageWrapper>
  );
}

export default MyPage;
