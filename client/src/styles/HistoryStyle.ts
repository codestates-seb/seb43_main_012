import styled from 'styled-components';

// 히스토리 전체
export const HistoryBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  height: 90vh;
`;

// 검색창
export const SearchBox = styled.input`
  padding-left: 24px;
  width: 45vw;
  height: 30px;
  color: #d9d9d9;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

// 히스토리페이지의 윗 부분
export const HistoryHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;

  padding: 50px 20px 30px 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 997;
  background-color: white;
`;

// 필터링
export const FilterBox = styled.div`
  padding: 5px 20px;
`;

//히스토리페이지의 아래부분(대화모음부분)
export const HistoryBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  padding-top: 100px;
`;

// 시간표시
export const TimeLine = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 40px 0;
  display: flex;
  justify-content: flex-start;
  // padding-left: 10px;
`;
// 타임라인 박스
export const TimeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const DateContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // padding-top: 220px;
`;

// 전체 히스토리 삭제 버튼
export const DeleteButton = styled.button`
  border: none;
  border-radius: 30px;
  padding: 10px;
  font-size: 15px;
  font-weight: 500;
  border: 1.5px solid var(--color-default-yellow-darker);
  background-color: var(--color-default-yellow-10);
  // background-color: var(--color-default-yellow);
  color: var(--color-default-yellow-darker);

  &:hover {
    cursor: pointer;
    color: white;
    background-color: var(--color-default-yellow);
  }
`;
