import React from 'react';
import { CPopover } from '@coreui/react';
import { IconItem } from '../../styles/IconStyle';

// @ts-ignore
import { ReactComponent as AddTagIcon } from '../../assets/icons/main_qna/iconAddTag.svg';
//@ts-ignore
import { ReactComponent as TaggedIcon } from '../../assets/icons/main_qna/iconTagged.svg';
import { MyGenericFunctionType } from '../../data/d';

const TagHoverBtn = ({
  saved,
  handleAddTagClick,
}: {
  saved: boolean;
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
        {saved ? (
          <TaggedIcon onClick={handleAddTagClick} />
        ) : (
          <AddTagIcon onClick={handleAddTagClick} />
        )}
      </IconItem>
    </CPopover>
  );
};

export default TagHoverBtn;
