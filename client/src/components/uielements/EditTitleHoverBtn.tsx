import React from 'react';
import { CPopover } from '@coreui/react';
import { IconItem } from '../../styles/IconStyle';

// @ts-ignore
import { ReactComponent as EditIcon } from '../../assets/icons/main_qna/iconEdit2.svg';
import { MyGenericFunctionType } from '../../data/d';

type Props = {
  handleEditClick: MyGenericFunctionType<any>;
};
const EditTitleHoverBtn = ({ handleEditClick }: Props) => {
  return (
    <CPopover
      className="popover_saveUI_hover"
      content="edit"
      placement="top"
      trigger="hover"
    >
      <IconItem>
        <EditIcon onClick={handleEditClick} />
      </IconItem>
    </CPopover>
  );
};

export default EditTitleHoverBtn;
