import { ReactElement, useState, useEffect } from 'react';
import {
  MyEditData,
  EditView,
  EditForm,
  EditCharacterText,
} from '../../styles/MyPageStyle';
import { useNavigate } from 'react-router-dom';
import {
  Character,
  CharacterWrapper,
  ModalBackdrop,
} from '../../styles/CharacterStyle';
import ModalCharacter from '../modals/ModalCharacter';
import { handleNameUpdate, handlePasswordUpdate } from '../../api/MemberApi';
import { UserInfoItemTypes, handleUserInfo } from '../../api/MemberApi';
import useCheck from '../../utils/hooks/useCheck';
import { checkPassword, checkUsername } from '../../utils/checkSignup';
import { ErrorMessage } from '../../styles/SignupStyle';
import { useAppDispatch } from '../../app/hooks';
import { updateUsername } from '../../features/member/loginInfoSlice';

type ModalEditProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ModalEdit({ isOpen, setIsOpen }: ModalEditProps): ReactElement {
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  useCheck(checkUsername, usernameInput, setIsUsername);
  useCheck(checkPassword, passwordInput, setIsPassword);

  const [isOpen2, setIsOpen2] = useState(false);

  const Id = localStorage.getItem('memberId');
  const dispatch = useAppDispatch();

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

  const handleInvalidUsername = () => {
    alert('중복되는 Username입니다.');
  };

  const handleSave = async () => {
    const updatedUsername = usernameInput;
    const updatedPassword = passwordInput;

    if (!updatedUsername && !updatedPassword) {
      closeModalHandler();
      return;
    }
    if (updatedUsername) {
      // 패치
      try {
        await handleNameUpdate(`user/${Id}`, updatedUsername);
        dispatch(updateUsername(updatedUsername));
        setUsernameInput('');
      } catch (error) {
        console.log('update name error', error);
        //중복된다고 메시지를 띄우기
        handleInvalidUsername();
        throw error;
      }
    }
    if (updatedPassword) {
      //패치
      try {
        await handlePasswordUpdate(`user/${Id}`, updatedPassword);
        setPasswordInput('');
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
                avatarLink[0].toUpperCase()
              ) : (
                <img src={avatarLink} alt="" />
              )}
            </Character>
            <EditCharacterText>Click to change</EditCharacterText>
            <EditCharacterText>avatar!</EditCharacterText>
            {isOpen2 && (
              <ModalCharacter isOpen={isOpen2} setIsOpen={setIsOpen2} />
            )}
            <EditForm>
              {/* <MyEditData>EDIT USER INFO</MyEditData> */}
              <MyEditData> Username</MyEditData>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              ></input>
              <MyEditData>Password</MyEditData>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              ></input>
            </EditForm>
            {!passwordInput && !usernameInput ? (
              <div>
                <button>save</button>
              </div>
            ) : (passwordInput && isPassword) ||
              (usernameInput && isUsername) ? (
              <div>
                <button onClick={handleSave}>save</button>
              </div>
            ) : passwordInput && !isPassword ? (
              <div>
                <ErrorMessage>
                  비밀번호는 대소문자, 숫자, 특수문자를 포함한 8자리 이상의
                  문자여야합니다.
                </ErrorMessage>

                <button>save</button>
              </div>
            ) : usernameInput && !isUsername ? (
              <div>
                <ErrorMessage>Username은 4자 이상이어야 합니다.</ErrorMessage>

                <button>save</button>
              </div>
            ) : (
              <div>
                <button>save</button>
              </div>
            )}
          </EditView>
        </ModalBackdrop>
      )}
    </CharacterWrapper>
  );
}

export default ModalEdit;
