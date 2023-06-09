import { ReactElement, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CharacterWrapper,
  ModalBackdrop,
  ModalView,
  CharacterBox,
  Character,
  MainCharacter,
} from '../../styles/CharacterStyle';
import {
  handleUserInfo,
  UserInfoItemTypes,
  handleUpdate,
} from '../../api/MemberApi';
//모달 오픈 프롭스
type ModalCharacterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

import { useAppDispatch } from '../../app/hooks';
import { updateAvatar } from '../../features/member/loginInfoSlice';
function ModalCharacter({
  isOpen,
  setIsOpen,
}: ModalCharacterProps): ReactElement {
  // 로컬에 저장한 memberId를 가져와서 파라미터 사용
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Id = localStorage.getItem('memberId');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [avatarLink, setAvatarLink] = useState<string>(''); // avatarLink 변수 정의
  const [username, setUsername] = useState<string>('');
  // 유저 정보 get 그중 avatarLink 가져오기, Id가 변동될 때마다 진행
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData: UserInfoItemTypes = await handleUserInfo(`user/${Id}`);
        const fetchedAvatarLink = userData.avatarLink;
        setSelectedCharacter(fetchedAvatarLink);
        setUsername(userData.username);
        setAvatarLink(fetchedAvatarLink); // avatarLink에 값 설정
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, [isOpen]);
  // 모달 닫기 헨들러
  // 정보 패치 후 모달 닫기
  const closeModalHandler = async () => {
    try {
      const newAvatarLink = selectedCharacter;
      await handleUpdate(`user/${Id}`, newAvatarLink);
      dispatch(updateAvatar(newAvatarLink));
      // console.log(newAvatarLink);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModalHandler2 = () => {
    setIsOpen(false);
  };
  // 아바타 지정 핸들러 (아바타 클릭시 해당 url이 저장)
  const selectCharacterHandler = (character: string) => {
    setSelectedCharacter(character);
    setIsOpen(true);
  };
  return (
    <CharacterWrapper>
      {isOpen && (
        <ModalBackdrop onClick={closeModalHandler2}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <h2>Select Your Character</h2>
            <CharacterBox>
              <MainCharacter>
                {selectedCharacter === username ? (
                  username[0]?.toUpperCase()
                ) : (
                  <img src={selectedCharacter} alt="" />
                )}
              </MainCharacter>
              <section className="charactersection">
                <div className="characterdiv">
                  <Character
                    onClick={() => selectCharacterHandler('/character1.png')}
                    className={
                      selectedCharacter === '/character1.png' ? 'selected' : ''
                    }
                  >
                    <img src="/character1.png" alt="Character A" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler('/character2.png')}
                    className={
                      selectedCharacter === '/character2.png' ? 'selected' : ''
                    }
                  >
                    <img src="/character2.png" alt="Character B" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler('/character3.png')}
                    className={
                      selectedCharacter === '/character3.png' ? 'selected' : ''
                    }
                  >
                    <img src="/character3.png" alt="Character C" />
                  </Character>
                </div>
                <div className="characterdiv">
                  <Character
                    onClick={() => selectCharacterHandler('/character4.png')}
                    className={
                      selectedCharacter === '/character4.png' ? 'selected' : ''
                    }
                  >
                    <img src="/character4.png" alt="Character D" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler('/character5.png')}
                    className={
                      selectedCharacter === '/character5.png' ? 'selected' : ''
                    }
                  >
                    <img src="/character5.png" alt="Character E" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler(username)}
                    className={
                      selectedCharacter === avatarLink ? 'selected' : ''
                    }
                  >
                    {username[0]?.toUpperCase()}
                  </Character>
                </div>
              </section>
            </CharacterBox>
            <div className="button-container">
              <button
                className="selectbutton"
                type="button"
                onClick={closeModalHandler}
              >
                Select
              </button>
            </div>
          </ModalView>
        </ModalBackdrop>
      )}
    </CharacterWrapper>
  );
}
export default ModalCharacter;
