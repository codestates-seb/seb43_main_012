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
  background: rgba(256, 256, 256, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 999;
`;

//모달 내부
export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  background-color: #fafafa;
  width: 90%;
  max-width: 795px;
  height: 85%;
  margin-bottom: 5%;
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
    height: 60px;
  }
  .selectbutton {
    font-size: 20px;
    font-weight: bold;
    color: black;
    background-color: #fafafa;
    border: none;
    text-decoration-line: underline;
    text-decoration-color: #c9ad6e;
    border-radius: 5px;
    :hover {
      color: #fff;
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
    border-radius: 5px;
    margin-top: 30px;
    padding-bottom: 10px;
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

// 캐릭터 고르는 박스
//section은 박스 중 위 아래 나눠진 부분 위에 3개 묶음, 아래 3개 묶음
export const CharacterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  width: 1000px;
  .characterdiv {
    display: flex;
    flex-direction: row;
    width: 100px;
    justify-content: center;
    align-items: center;
  }
  .charactersection {
    display: flex;
    flex-direction: column;
    height: 250px;
  }
`;

// 각 개별 캐릭터
export const Character = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  max-width: 72px;
  max-height: 72px;
  text-align: center;
  padding: 40px;
  font-weight: bold;
  font-size: 2rem;
  color: #fff;
  background-color: var(--color-default-green);
  border: none;
  border-radius: 50px;
  margin-right: 20px;
  box-shadow: 1px 5px 6px rgba(0, 0, 0, 0.2);
  transition: padding 0.2s ease-in-out;

  img {
    max-width: 72px;
    max-height: 72px;
    transition: max-width 0.3s ease-in-out, max-height 0.3s ease-in-out,
      padding-bottom 0.3s ease-in-out;
    // width: 8vw;
    // height: 8vw;
  }

  img:hover,
  img:focus {
    max-width: 106px;
    max-height: 106px;
    padding-bottom: 20px;
    transition: max-width 0.4s ease-in-out, max-height 0.4s ease-in-out,
      padding-bottom 0.3 ease-in-out;
  }

  :hover {
    padding: 2rem;
    transition: padding 0.2s ease-in-out;
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
