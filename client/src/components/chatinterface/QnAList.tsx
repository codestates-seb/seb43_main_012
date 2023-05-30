import React from 'react';
import QnA from './QnA';
import { QnAType } from '../../data/d';
import { QnAListBox, LoadingBox } from '../../styles/MainStyle';
// import Loading from '../chatinterface/Loading';

import loadingGif from '../../assets/gifs/typing_final.gif';
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
};

const BottomMargin = styled.div`
  display: flex;

  padding: 20px 0;
`;

const QnAList = ({ isLoading, qnaItems }: QnAListProps) => {
  return (
    <>
      <QnAListBox id="qnaList">
        {qnaItems.map((qna) => (
          <QnA key={qna.qnaId} qnaItem={qna} />
        ))}
        <BottomMargin />
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
