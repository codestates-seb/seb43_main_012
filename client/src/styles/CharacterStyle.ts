import styled from 'styled-components';

// 모달 감싸기
export const CharacterWrapper = styled.div`
  display: flex;
`;
// 모달 백그라운드
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 99;
`;

//모달 내부
export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
  background-color: #fafafa;
  width: 90%;
  max-width: 795px;
  height: 70%;
  color: black;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  .modal-text {
    font-size: var(--font-title-small);
    font-weight: 700;
    margin-bottom: 5%;
  }
  h2 {
    color: #c9ad6e;
    padding-bottom: 30px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .selectbutton {
    font-size: 20px;
    font-weight: bold;
    color: black;
    background-color: #fafafa;
    border: none;
    text-decoration-line: underline;
    text-decoration-color: #c9ad6e;
    padding-top: 10vh;
    width: 10%;
    height: 40px;
    border-radius: 5px;
    :hover {
      color: #c9ad6e;
    }
  }
  .Selectbutton {
    font-size: 20px;
    font-weight: bold;
    color: black;
    background-color: #fafafa;
    border: none;
    text-decoration-line: underline;
    text-decoration-color: #c9ad6e;
    width: 10%;
    border-radius: 5px;
    margin-top: 20%;
    :hover {
      color: #c9ad6e;
    }
  }
  input {
    width: 20%;
    &:focus {
      outline: none;
      border: 2px solid #77ad69;
      box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const CharacterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: row;
  }
`;

export const Character = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 72px;
  max-height: 72px;
  min-width: 36px;
  min-height: 36px;
  width: 8vw;
  height: 8vw;
  text-align: center;
  padding: 2.5rem;
  font-weight: bold;
  font-size: 2rem;
  color: #fff;
  background-color: #77ad69;
  border: none;
  border-radius: 50px;
  margin: 2vh;
  box-shadow: 1px 5px 6px rgba(0, 0, 0, 0.2);

  img {
    max-width: 72px;
    max-height: 72px;
    width: 8vw;
    height: 8vw;
  }

  :hover {
    border: 2px solid #78ad69;
  }
`;

export const MainCharacter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  font-size: 5rem;
  max-width: 134px;
  max-height: 134px;
  min-width: 67px;
  min-height: 67px;
  width: 15vw;
  height: 15vw;
  color: #fff;
  background-color: #77ad69;
  border: none;
  border-radius: 100px;
  margin: 0 4rem 0vw 4rem;

  img {
    max-width: 130px;
    max-height: 130px;
    width: 14vw;
    height: 14vw;
  }
`;
