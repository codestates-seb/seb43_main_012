import React from 'react';
import { CPopover } from '@coreui/react';
import { IconItem } from '../../styles/IconStyle';

// @ts-ignore
import { ReactComponent as AddBookmarkIcon } from '../../assets/icons/main_qna/iconAddBookmark.svg';
// @ts-ignore
import { ReactComponent as BookmarkedIcon } from '../../assets/icons/main_qna/iconBookmarked2.svg';

import { MyGenericFunctionType } from '../../data/d';

type Props = {
  saved: boolean;
  handleSaveClick: MyGenericFunctionType<any>;
};

const BookmarkHoverBtn = ({ saved, handleSaveClick }: Props) => {
  return (
    <CPopover
      className="popover_saveUI_hover"
      content="save"
      placement="top"
      trigger="hover"
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

export default BookmarkHoverBtn;
