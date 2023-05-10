import { ReactElement, useState } from 'react';
import { DisplayNameWrapper, DisplayNameButton } from '../../styles/DisplayNameStyle';
import { ModalBackdrop, ModalView } from '../../styles/CharacterStyle';
import ModalCharacter from '../modals/ModalCharacter';
import SignupInput from '../../components/SignupInput';

type ModalDisplayNameProps = {
  isOpen2: boolean;
  setIsOpen2: (isOpen: boolean) => void;
};

function ModalDisplayName({ isOpen2, setIsOpen2 }: ModalDisplayNameProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const closeModalHandler = () => {
    setIsOpen2(false);
    setIsOpen(!isOpen);
  };

  return (
    <DisplayNameWrapper>
      {isOpen2 ? (
        <ModalBackdrop onClick={closeModalHandler}>
          <ModalView onClick={e => e.stopPropagation()}>
            <SignupInput labelName="Display name" inputType="text" />

            <DisplayNameButton className="displayNamebutton" type="button" onClick={closeModalHandler}>
              <h2>Save</h2>
            </DisplayNameButton>
          </ModalView>
        </ModalBackdrop>
      ) : null}
      <ModalCharacter isOpen={isOpen} setIsOpen={setIsOpen} />
    </DisplayNameWrapper>
  );
}

export default ModalDisplayName;
