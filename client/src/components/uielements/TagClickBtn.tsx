import React from 'react';
import { CPopover } from '@coreui/react';
import { IconItem } from '../../styles/IconStyle';

import DialogBoxAddTag from '../dialogbox/DialogBoxAddTag';
import DialogBoxSaveBookmark from '../dialogbox/DialogBoxSaveBookmark';
//@ts-ignore
import { ReactComponent as TaggedIcon } from '../../assets/icons/main_qna/iconTagged.svg';
import { ReactComponent as AddTagIcon } from '../../assets/icons/main_qna/iconAddTag.svg';

import { MyGenericFunctionType } from '../../data/d';

type Props = {
  saved: boolean;
  //   popoverOpen: boolean;
  handleSaveClick: MyGenericFunctionType<any>;
  //   setIsModalOpen: (isOpen: boolean) => void;
};

const TagClickBtn = ({ saved, handleSaveClick }: Props) => {
  return (
    <CPopover
      className="popover_saveUI"
      //   content="content"
      content={<DialogBoxAddTag />}
      placement="bottom"
      trigger="click"
      visible={true}
    >
      <IconItem>
        {saved ? (
          <TaggedIcon onClick={handleSaveClick} />
        ) : (
          <AddTagIcon onClick={handleSaveClick} />
        )}
      </IconItem>
    </CPopover>
  );
};

export default TagClickBtn;
