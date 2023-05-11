import { ReactElement, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  CharacterWrapper,
  ModalBackdrop,
  ModalView,
  CharacterBox,
  Character,
  MainCharacter,
} from "../../styles/CharacterStyle";

type ModalCharacterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function ModalCharacter({ isOpen, setIsOpen }: ModalCharacterProps): ReactElement {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState("P");

  const closeModalHandler = () => {
    setIsOpen(false);
    navigate(`/`); 
  };

  const selectCharacterHandler = (character: string) => {
    setSelectedCharacter(character);
    setIsOpen(true)
  };

  return (
    <CharacterWrapper>
      {isOpen && (
        <ModalBackdrop>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <CharacterBox>
              <MainCharacter>
                {selectedCharacter === "P" ? (
                  "P"
                ) : (
                  <img src={selectedCharacter} alt = ""/>
                )}
              </MainCharacter>
              <section>
                <div>
                  <Character
                    onClick={() => selectCharacterHandler("/character1.png")}
                    className={
                      selectedCharacter === "/character1.png" ? "selected" : ""
                    }
                  >
                    <img src="/character1.png" alt="Character A" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler("/character2.png")}
                    className={
                      selectedCharacter === "/character2.png" ? "selected" : ""
                    }
                  >
                    <img src="/character2.png" alt="Character B" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler("/character3.png")}
                    className={
                      selectedCharacter === "/character3.png" ? "selected" : ""
                    }
                  >
                    <img src="/character3.png" alt="Character C" />
                  </Character>
                </div>
                <div>
                  <Character
                    onClick={() => selectCharacterHandler("/character4.png")}
                    className={
                      selectedCharacter === "/character4.png" ? "selected" : ""
                    }
                  >
                    <img src="/character4.png" alt="Character D" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler("/character5.png")}
                    className={
                      selectedCharacter === "/character5.png" ? "selected" : ""
                    }
                  >
                    <img src="/character5.png" alt="Character E" />
                  </Character>
                  <Character
                    onClick={() => selectCharacterHandler("P")}
                    className={selectedCharacter === "P" ? "selected" : ""}
                  >
                    P
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
