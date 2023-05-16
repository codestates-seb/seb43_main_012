import { ReactElement } from 'react';
import { MyEditData, EditView, EditForm } from '../../styles/MyPageStyle';
import { Character, CharacterWrapper, ModalBackdrop } from '../../styles/CharacterStyle';

type ModalEditProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ModalEdit({ isOpen, setIsOpen }: ModalEditProps): ReactElement {
  const displayName = 'New Name';

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <CharacterWrapper>
      {isOpen && (
        <ModalBackdrop onClick={closeModalHandler}>
          <EditView onClick={e => e.stopPropagation()}>
            <Character>{displayName[0]}</Character>
            <EditForm>
              <MyEditData>DisplayName</MyEditData>
              <input type="text"></input>
              <MyEditData>password</MyEditData>
              <input type="text"></input>
            </EditForm>
            <div>
              <button onClick={closeModalHandler}>save</button>
            </div>
          </EditView>
        </ModalBackdrop>
      )}
    </CharacterWrapper>
  );
}

export default ModalEdit;
