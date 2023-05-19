import React from 'react';
import QnA from './QnA';
import { QnAType } from '../../data/dataTypes';
import { QnAListBox, LoadingBox } from '../../styles/MainStyle';
// import Loading from '../chatinterface/Loading';

import loadingGif from '../../assets/gifs/typing_colorful.gif';
import styled from 'styled-components';

const LoadingWrap = styled(LoadingBox)`
  height: 100%;
  margin: 0;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type QnAListProps = {
  isLoading: boolean;
  qnaItems: QnAType[];
  handleCheck: ({
    id,
    newCheckValue,
  }: {
    id: number;
    newCheckValue: boolean;
  }) => void;
};

const QnAList = ({ isLoading, qnaItems, handleCheck }: QnAListProps) => {
  return (
    <>
      <QnAListBox id="qnaList">
        {qnaItems.map((qna) => (
          <QnA key={qna.qnaId} qnaItem={qna} handleCheck={handleCheck} />
        ))}
      </QnAListBox>
      {isLoading && (
        <LoadingWrap>
          <Loading>
            <img src={loadingGif} alt="Loading" />
          </Loading>
        </LoadingWrap>
      )}
    </>
  );
};

export default QnAList;
