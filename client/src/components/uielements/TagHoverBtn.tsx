import React from 'react';
import { CPopover } from '@coreui/react';
import { IconItem } from '../../styles/IconStyle';

// @ts-ignore
import { ReactComponent as AddTagIcon } from '../../assets/icons/main_qna/iconAddTag.svg';

import { MyGenericFunctionType } from '../../data/d';

const TagHoverBtn = ({
  handleAddTagClick,
}: {
  handleAddTagClick: MyGenericFunctionType<any>;
}) => {
  return (
    <CPopover
      className="popover_saveUI_hover"
      content="tag"
      placement="top"
      trigger="hover"
    >
      <IconItem>
        <AddTagIcon onClick={handleAddTagClick} />
      </IconItem>
    </CPopover>
  );
};

export default TagHoverBtn;
