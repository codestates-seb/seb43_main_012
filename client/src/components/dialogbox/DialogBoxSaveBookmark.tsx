import React from 'react';
import styled from 'styled-components';
import {
  DialogBox,
  DialogItems,
  DialogSelectItem,
  SignOutFooter,
  SignoutItem,
} from '../../styles/TopNavStyle';
import { ModalBackdrop } from '../../styles/CharacterStyle';

const BoxBackdrop = styled(ModalBackdrop)`
  background: transparent;
  z-index: 999;
`;
const BookmarkItems = styled(DialogItems)`
  padding: 15px 10px;
  max-height: 200px;
  font-size: 16px;
`;

const InsetGradient = styled.div`
  width: 2rem;
  z-index: 10;
  position: absolute;
  bottom: 0;
  top: 0;
  right: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 37%
  );
  // background-image: linear-gradient(to left, white);
`;

type Props = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogBoxSaveBookmark = ({ setIsOpen }: Props) => {
  const handleModalBackdropClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  const tempBookmarks = [
    'VeryVeryveryveryveryveryverylong bookmark',
    'Bookmark2',
    'Bookmark3',
    'Bookmark4',
    'Bookmark5',
  ];

  return (
    <>
      <BookmarkItems>
        {tempBookmarks.map((bookmark, index) => (
          <DialogSelectItem key={index}>
            {bookmark}
            <InsetGradient></InsetGradient>
          </DialogSelectItem>
        ))}
      </BookmarkItems>
    </>
  );
};

export default DialogBoxSaveBookmark;
