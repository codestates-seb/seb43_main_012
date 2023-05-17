import React, { useState } from 'react';
import { QnAType } from '../../data/dataTypes';
import Checkbox from './Checkbox';
import {
  QnAItemBox,
  QnAItem,
  QnACheckbox,
  QnATitle,
  QnAAnswer,
  Center,
} from '../../styles/MainStyle';

type qnaProps = {
  qnaItem: QnAType;
  handleCheck: ({
    id,
    newCheckValue,
  }: {
    id: number;
    newCheckValue: boolean;
  }) => void;
};
const QnA = ({ qnaItem, handleCheck }: qnaProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <QnAItemBox>
      <QnAItem>
        <QnACheckbox>
          <Checkbox
            id={qnaItem.qnaId}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            handleCheck={handleCheck}
          />
        </QnACheckbox>
        <Center>
          <QnATitle>{qnaItem.question}</QnATitle>
        </Center>
      </QnAItem>
      <QnAItem>
        <QnACheckbox>
          <Checkbox
            id={qnaItem.qnaId}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            handleCheck={handleCheck}
          />
        </QnACheckbox>
        <Center>
          <QnAAnswer>{qnaItem.answer}</QnAAnswer>
        </Center>
      </QnAItem>
    </QnAItemBox>
  );
};

export default QnA;
