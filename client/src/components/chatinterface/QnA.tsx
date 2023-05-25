import React, { useState } from 'react';
import { QnAType } from '../../data/d';
import Checkbox from './Checkbox';
import {
  QnAItemBox,
  QnAItem,
  QnACheckbox,
  QnATitle,
  QnAAnswer,
  Center,
} from '../../styles/MainStyle';

import { useAppDispatch } from '../../app/hooks';
import { changeQnASaveStatus } from '../../features/main/conversationSlice';
import TextWithFormatting from './TextWithFormatting';

type qnaProps = {
  qnaItem: QnAType;
};

type CheckProps = {
  id: number;
  newCheckValue: boolean;
};
const QnA = ({ qnaItem }: qnaProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const handleCheck = ({ id, newCheckValue }: CheckProps) => {
    dispatch(changeQnASaveStatus({ id: qnaItem.qnaId, newCheckValue }));
  };

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
          {/* <QnAAnswer>{qnaItem.answer}</QnAAnswer> */}

          <QnAAnswer>{TextWithFormatting(qnaItem.answer)}</QnAAnswer>
        </Center>
      </QnAItem>
    </QnAItemBox>
  );
};

export default QnA;
