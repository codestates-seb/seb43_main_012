import { ReactElement, useState, useEffect } from 'react';
import { MyEditData, EditView, EditForm } from '../../styles/MyPageStyle';
import {
  Character,
  CharacterWrapper,
  ModalBackdrop,
} from '../../styles/CharacterStyle';
import ModalCharacter from '../modals/ModalCharacter';
import { handleNameUpdate, handlePasswordUpdate } from '../../api/MemberApi';
import { UserInfoItemTypes, handleUserInfo } from '../../api/MemberApi';

type ModalEditProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ModalEdit({ isOpen, setIsOpen }: ModalEditProps): ReactElement {
  const displayName = 'New Name';

  const [displayNameInput, setDisplayNameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [isOpen2, setIsOpen2] = useState(false);

  const Id = localStorage.getItem('memberId');

  const CharacterModal = () => {
    setIsOpen2(!isOpen2);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
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
  }, [Id]);

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
              {setAvatarLink === setUsername ? (
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
                type="text"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              ></input>
            </EditForm>
            <div>
              <button onClick={handleSave}>save</button>
            </div>
          </EditView>
        </ModalBackdrop>
      )}
    </CharacterWrapper>
  );
}

export default ModalEdit;
