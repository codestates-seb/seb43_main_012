import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EditSaveUIBox } from '../../styles/MainStyle';
import DialogBoxSaveBookmark from '../dialogbox/DialogBoxSaveBookmark';
//import style
import { CPopover } from '@coreui/react';
import styled from 'styled-components';
import '../../styles/sass/custom_popover_saveUI.scss';

//import data types
import { BookmarkType } from '../../data/dataTypes';

//import icons
// @ts-ignore
import { ReactComponent as EditIcon } from '../../assets/icons/main_qna/iconEdit2.svg';
// @ts-ignore
import { ReactComponent as AddBookmarkIcon } from '../../assets/icons/main_qna/iconAddBookmark.svg';
// @ts-ignore
import { ReactComponent as AddTagIcon } from '../../assets/icons/main_qna/iconAddTag.svg';
// @ts-ignore
import { ReactComponent as ConfirmIcon } from '../../assets/icons/main_qna/iconCheck.svg';
// @ts-ignore
import { ReactComponent as CancelIcon } from '../../assets/icons/main_qna/iconCancel.svg';
type Props = {
  cId: number;
  bookmarks: BookmarkType[];
  editState: boolean;
  setEditState: Dispatch<SetStateAction<boolean>>;
  setEditConfirm: Dispatch<SetStateAction<boolean>>;
};

const IconItems = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--b60);
  margin: 0 5px;

  svg {
    width: var(--size-icon-default);
    height: var(--size-icon-default);
    fill?: currentColor;
    stroke?: currentColor;
    // stroke: currentColor;
  }

  svg:hover {
    fill?: black;
    stroke?: black;
  }

  &: hover {
    cursor: pointer;
    color: black;
  }
`;

const EditSaveUI = ({
  cId,
  bookmarks,
  editState,
  setEditState,
  setEditConfirm,
}: Props) => {
  const [isSaveBoxOpen, setIsSaveBoxOpen] = useState<boolean>(false);
  const handleSaveClick = () => {
    console.log('clicked save!');
    setIsSaveBoxOpen(!isSaveBoxOpen);
  };
  const handleConfirmClick = () => {
    console.log('confirm click!');
    setEditConfirm(true);
    setEditState(!editState);
  };

  const handleCancelClick = () => {
    setEditConfirm(false);
    setEditState(!editState);
  };

  const handleEditClick = () => {
    setEditState(!editState);
  };

  useEffect(() => {
    if (editState) {
      console.log('entered edit state!');
      const element = document.getElementById('titleInput') as HTMLInputElement;
      if (element) {
        // console.log('found title element');
        element.selectionStart = element.value.length;
        element.selectionEnd = element.value.length;
        element.focus();
      }
    }
  }, [editState]);
  return (
    <EditSaveUIBox>
      {editState ? (
        <>
          <IconItem>
            <ConfirmIcon onClick={handleConfirmClick} />
          </IconItem>
          <IconItem>
            <CancelIcon onClick={handleConfirmClick} />
          </IconItem>
        </>
      ) : (
        <IconItems>
          <IconItem>
            <EditIcon onClick={handleEditClick} />
          </IconItem>
          <IconItem>
            <AddTagIcon />
          </IconItem>
          <CPopover
            className="popover_saveUI"
            content={<DialogBoxSaveBookmark bookmarks={bookmarks} cId={cId} />}
            placement="bottom"
          >
            <IconItem>
              <AddBookmarkIcon onClick={handleSaveClick} />
            </IconItem>
          </CPopover>
        </IconItems>
      )}
    </EditSaveUIBox>
  );
};

export default EditSaveUI;
