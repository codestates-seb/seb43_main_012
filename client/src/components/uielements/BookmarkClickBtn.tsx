import React from 'react';
import { CPopover } from '@coreui/react';
import { IconItem } from '../../styles/IconStyle';

import DialogBoxSaveBookmark from '../dialogbox/DialogBoxSaveBookmark';
// @ts-ignore
import { ReactComponent as AddBookmarkIcon } from '../../assets/icons/main_qna/iconAddBookmark.svg';
// @ts-ignore
import { ReactComponent as BookmarkedIcon } from '../../assets/icons/main_qna/iconBookmarked2.svg';

import { MyGenericFunctionType } from '../../data/d';

type Props = {
  saved: boolean;
  popoverOpen: boolean;
  handleSaveClick: MyGenericFunctionType<any>;
  setIsModalOpen: (isOpen: boolean) => void;
};

const BookmarkClickBtn = ({
  saved,
  popoverOpen,
  handleSaveClick,
  setIsModalOpen,
}: Props) => {
  return (
    <CPopover
      className="popover_saveUI"
      content={<DialogBoxSaveBookmark setIsModalOpen={setIsModalOpen} />}
      placement="bottom"
      trigger="click"
      visible={popoverOpen}
    >
      <IconItem>
        {saved ? (
          <BookmarkedIcon onClick={handleSaveClick} />
        ) : (
          <AddBookmarkIcon onClick={handleSaveClick} />
        )}
      </IconItem>
    </CPopover>
  );
};

export default BookmarkClickBtn;
