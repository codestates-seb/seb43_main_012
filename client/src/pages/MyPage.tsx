import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalEdit from '../components/modals/ModalEdit';
import { MyPageWrapper, MyData } from '../styles/MyPageStyle';
import { MainCharacter } from '../styles/CharacterStyle';

const MyPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const email = `newname@naver.com`;
  const displayName = `New Name`;
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
      <MainCharacter>{displayName[0]}</MainCharacter>
      <div className='modalbutton'>
        <button onClick={handleClick}>프로필 편집</button>
        <ModalEdit isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <MyData>{email}</MyData>
      <MyData>{`DisplayName: ${displayName}`}</MyData>
      <div className='downbutton'>
      <Link to="/"><button>로그아웃</button></Link>
      <button onClick={buttonClick}>회원탈퇴</button>
      </div>
    </MyPageWrapper>
    
  );
};

export default MyPage;
