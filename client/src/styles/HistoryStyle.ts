import styled from 'styled-components';

// 히스토리 전체
export const HistoryBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95vw;
  overflow: auto;
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

export const FixedTopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 80px;
  z-index: 997;
  width: 100%;
`;

// 히스토리페이지의 윗 부분
export const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 90vw;
  position: absolute;
  top: 30px;
  z-index: 997;
  // justify-content: space-around;
`;

// 필터링
export const Filtering = styled.div`
  padding: 5px;
`;

// 전체 히스토리 삭제 버튼
export const DeleteButton = styled.button`
  padding: 5px;
`;

//히스토리페이지의 아래부분(대화모음부분)
export const HistoryBody = styled.div`
  margin: 2%;
  display: flex;
  flex-direction: column;
  width: 90vw;
  justify-content: space-around;
`;

// 시간표시
export const TimeLine = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 40px;
`;
// 타임라인 박스
export const TimeBox = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  div {
    min-width: 200px;
    height: 150px;
  }
`;

export const DateContainer = styled.div``;
