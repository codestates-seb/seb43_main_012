import styled from 'styled-components';

export const DisplayNameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DisplayNameButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: black;
  background-color: #fafafa;
  border: none;
  text-decoration-line: underline;
  text-decoration-color: #c9ad6e;
  width: 100%;
  height: 40px;
  :hover {
    color: #c9ad6e;
  }
`;

export const MyTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin: 6%;
`;
