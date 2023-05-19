import styled from 'styled-components';

// 히스토리 전체
export const HistoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95vw;
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
  flex-direction: row;
  width: 70vw;
  justify-content: space-around;
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
  font-size: 15px;
  font-weight: bold;
  margin: 5%;
`;
// 타임라인 박스
export const TimeBox = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  div {
    min-width: 200px;
    height: 100px;
    border: 2px solid;
    margin: 1.5%;
  }
`;

//히스토리페이지의 아래부분2(버튼 누른 후)
export const HistoryBody2 = styled.div`
  margin-top: -1%;
  margin-bottom: 1%;
  display: flex;
  flex-direction: column;
  width: 90vw;
  justify-content: space-around;
`;

export const DateContainer = styled.div``;
export const DateButton = styled.div``;
export const ContentContainer = styled.div``;
export const ContentWraper = styled.div``;
export const Content = styled.div``;

