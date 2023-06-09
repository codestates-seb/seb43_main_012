import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import { RootState } from '../../app/store';

type qnaProps = {
  qnaItem: QnAType;
};

type CheckProps = {
  id: number;
  newCheckValue: boolean;
};

const QnA = ({ qnaItem }: qnaProps) => {
  const isToggled = useSelector(
    (state: RootState) => state.collection.isToggled,
  );

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [showAnswer, setShowAnswer] = useState<boolean>(isToggled);

  const dispatch = useAppDispatch();

  const handleCheck = ({ id, newCheckValue }: CheckProps) => {
    dispatch(changeQnASaveStatus({ id: qnaItem.qnaId, newCheckValue }));
  };

  const handleShowAnswer = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('qnaitem:', qnaItem);
    setShowAnswer(!showAnswer);
  };

  return (
    <QnAItemBox>
      <QnAItem>
        <QnACheckbox>
          <Checkbox
            id={qnaItem.qnaId}
            // 추가된 부분
            isChecked={isChecked}
            setIsChecked={() => setIsChecked(!isChecked)}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            handleCheck={handleCheck}
          />
        </QnACheckbox>
        <Center>
          {/* 추가된 부분 */}
          <QnATitle onClick={handleShowAnswer}>{qnaItem.question}</QnATitle>
        </Center>
      </QnAItem>
      {/* 추가된 부분 */}
      {showAnswer && (
        <QnAItem>
          <QnACheckbox>
            <Checkbox
              id={qnaItem.qnaId}
              isChecked={isChecked}
              setIsChecked={() => setIsChecked(!isChecked)}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
              handleCheck={handleCheck}
            />
          </QnACheckbox>

          <Center>
            <QnAAnswer>{TextWithFormatting(qnaItem.answer)}</QnAAnswer>
          </Center>
        </QnAItem>
      )}
    </QnAItemBox>
  );
};

export default QnA;
