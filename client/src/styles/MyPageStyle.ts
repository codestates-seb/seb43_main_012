import styled from 'styled-components';

// 마이페이지 전체
export const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 10vh;
  button {
    border: 1.5px solid #e7cc8f;
    background-color: #fff;
    width: 6rem;
    height: 1.7rem;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    margin: 40% 10%;
    :hover {
      background-color: #e7cc8f;
      color: #fff;
    }
  }
  .modalbutton {
    display: flex;
    flex-direction: column;
  }
  .downbutton {
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    margin-left: 17px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

export const MyData = styled.div`
  display: flex;
  justify-content: center;
  margin: 2%;
`;

export const MyEditData = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #e7cc8f;
  display: flex;
  justify-content: center;
  margin: 5%;
`;

export const EditCharacterText = styled.p`
  font-size: 13px;
  color: #e7cc8f;
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-style: italic;
`;

export const EditView = styled.div`
  padding-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 330px;
  min-width: 430px;
  margin-bottom: 5%;
  height: 70%;
  width: 90%;
  max-width: 290px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  button {
    height: 30px;
    width: 10rem;
    margin: 50px;
  }
  div {
    display: flex;
    flex-direction: column;
    margin: 15px 0px;
  }
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 3%;

  input {
    border: 2px solid #e7cc8f;
    border-radius: 5px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
    &:focus {
      outline: none;
      border: 2px solid #77ad69;
      box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
  }
`;
