import React from 'react';
import QnA from './QnA';
import { QnAType } from '../../data/dataTypes';
import { QnAListBox } from '../../styles/MainStyle';

type QnAListProps = {
  qnaItems: QnAType[];
  handleCheck: ({
    qnaId,
    isChecked,
  }: {
    qnaId: number;
    isChecked: boolean;
  }) => void;
};

const QnAList = ({ qnaItems, handleCheck }: QnAListProps) => {
  return (
    <QnAListBox id="qnaList">
      {qnaItems.map((qna) => (
        <QnA key={qna.qnaId} qnaItem={qna} handleCheck={handleCheck} />
      ))}
    </QnAListBox>
  );
};

export default QnAList;
