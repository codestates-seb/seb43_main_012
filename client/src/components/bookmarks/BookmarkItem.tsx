import React, { useState } from 'react';
//import style
import styled from 'styled-components';
import { DialogSelectItem } from '../../styles/TopNavStyle';
import { QnACheckbox, QnAItem } from '../../styles/MainStyle';
//import components
import Checkbox from '../chatinterface/Checkbox';
//import types
import { BookmarkType } from '../../data/d';

export const Bookmark = styled(DialogSelectItem)`
  position: relative;
  font-size: inherit;
`;

export const BookmarkCheckbox = styled(QnACheckbox)`
  width: 30px;
`;
export const InsetGradient = styled.div`
  width: 2rem;
  height: auto;
  z-index: 10;
  border-radius: 0.3rem;
  //   border: 1px solid yellow;

  position: absolute;
  bottom: 0;
  top: 0;
  right: -5px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 48%,
    rgba(255, 255, 255, 1) 100%
  );
`;

type ItemProp = {
  bookmark: BookmarkType;
  checkStatus: boolean;
  handleCheck: (...args: any[]) => void;
};

export const BookmarkItem = ({
  bookmark,
  checkStatus,
  handleCheck,
}: ItemProp) => {
  const [isChecked, setIsChecked] = useState<boolean>(checkStatus);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Bookmark>
      <BookmarkCheckbox>
        <div>
          <Checkbox
            id={bookmark.bookmarkId}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            handleCheck={handleCheck}
            size="small"
          />
        </div>
      </BookmarkCheckbox>
      {bookmark.bookmarkName}
      <InsetGradient />
    </Bookmark>
  );
};
