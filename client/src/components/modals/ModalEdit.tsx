import { ReactElement, useState, useEffect } from 'react';
import { MyEditData, EditView, EditForm } from '../../styles/MyPageStyle';
import { useNavigate } from 'react-router-dom';
import {
  Character,
  CharacterWrapper,
  ModalBackdrop,
} from '../../styles/CharacterStyle';
import ModalCharacter from '../modals/ModalCharacter';
import { handleNameUpdate, handlePasswordUpdate } from '../../api/MemberApi';
import { UserInfoItemTypes, handleUserInfo } from '../../api/MemberApi';
import useCheck from '../../hooks/useCheck';
import { checkPassword } from '../../utils/checkSignup';
import { ErrorMessage } from '../../styles/SignupStyle';

type ModalEditProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ModalEdit({ isOpen, setIsOpen }: ModalEditProps): ReactElement {
  const navigate = useNavigate();

  const [displayNameInput, setDisplayNameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [ispassword, setIsPassword] = useState(false);

  useCheck(checkPassword, passwordInput, setIsPassword);

  const [isOpen2, setIsOpen2] = useState(false);

  const Id = localStorage.getItem('memberId');

  const CharacterModal = () => {
    setIsOpen2(!isOpen2);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
    navigate('/mypage');
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData: UserInfoItemTypes = await handleUserInfo(`user/${Id}`);
        setAvatarLink(userData.avatarLink); // avatarLink에 값 설정
        setUsername(userData.username); // username 값 설정
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [isOpen2]);

  const handleSave = async () => {
    const updatedDisplayName = displayNameInput;
    const updatedPassword = passwordInput;

    if (!updatedDisplayName && !updatedPassword) {
      closeModalHandler();
      return;
    }
    if (updatedDisplayName) {
      // 패치
      try {
        await handleNameUpdate(`user/${Id}`, updatedDisplayName);
      } catch (error) {
        console.log(error);
      }
    }
    if (updatedPassword) {
      //패치
      try {
        await handlePasswordUpdate(`user/${Id}`, updatedPassword);
      } catch (error) {
        console.log(error);
      }
    }
    closeModalHandler();
  };

  return (
    <CharacterWrapper>
      {isOpen && (
        <ModalBackdrop onClick={closeModalHandler}>
          <EditView onClick={(e) => e.stopPropagation()}>
            <Character onClick={CharacterModal}>
              {avatarLink === username ? (
                avatarLink[0]
              ) : (
                <img src={avatarLink} alt="" />
              )}
            </Character>
            {isOpen2 && (
              <ModalCharacter isOpen={isOpen2} setIsOpen={setIsOpen2} />
            )}
            <EditForm>
              <MyEditData>DisplayName</MyEditData>
              <input
                type="text"
                value={displayNameInput}
                onChange={(e) => setDisplayNameInput(e.target.value)}
              ></input>
              <MyEditData>password</MyEditData>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              ></input>
            </EditForm>
            {ispassword ? (
              <div>
                <button onClick={handleSave}>save</button>
              </div>
            ) : (
              <div>
                <ErrorMessage>비밀번호는 영어, 숫자, 특수문자를 포함한 8자리 이상의 문자여야합니다.</ErrorMessage>
                <button onClick={handleSave}>save</button>
              </div>
            )}
          </EditView>
        </ModalBackdrop>
      )}
    </CharacterWrapper>
  );
}

export default ModalEdit;
