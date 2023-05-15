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

const BookmarkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const BookmarkBox = styled(DialogBox)`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 200px;
  width: 200px;
`;

type Props = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogBoxSaveBookmark = ({ setIsOpen }: Props) => {
  const handleModalBackdropClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <BookmarkWrapper>
      {/* <BoxBackdrop onClick={handleModalBackdropClick} /> */}
      <BookmarkBox>
        <DialogItems>
          <DialogSelectItem>Bookmark1</DialogSelectItem>
        </DialogItems>
        <DialogItems>
          <DialogSelectItem>Bookmark2</DialogSelectItem>
        </DialogItems>
        <DialogItems>
          <DialogSelectItem>Bookmark3</DialogSelectItem>
        </DialogItems>
        <DialogItems>
          <DialogSelectItem>Bookmark4</DialogSelectItem>
        </DialogItems>
      </BookmarkBox>
    </BookmarkWrapper>
  );
};

export default DialogBoxSaveBookmark;
