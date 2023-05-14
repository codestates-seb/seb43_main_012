import React from 'react';
import QnA from './QnA';
import { QnAType } from '../../data/dataTypes';
import { QnAListBox } from '../../styles/MainStyle';

type QnAListProps = {
  qnaItems: QnAType[];
};

const QnAList = ({ qnaItems }: QnAListProps) => {
  return (
    <QnAListBox id="qnaList">
      {qnaItems.map((qna) => (
        <QnA key={qna.qnaId} qnaItem={qna} />
      ))}
    </QnAListBox>
  );
};

export default QnAList;
