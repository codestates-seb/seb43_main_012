import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EditSaveUIBox } from '../../styles/MainStyle';
import DialogBoxSaveBookmark from '../dialogbox/DialogBoxSaveBookmark';
//import style
import { CPopover } from '@coreui/react';
import styled from 'styled-components';
import '../../styles/sass/custom_popover_saveUI.scss';
import '../../styles/sass/custom_popover_saveUI_hover.scss';
//import components
import ModalCreateBookmark from '../modals/ModalCreateBookmark';

//import data types
import { BookmarkType } from '../../data/d';

//import redux
import { useAppSelector, useAppDispatch } from '../../app/hooks';

//import icons
// @ts-ignore
import { ReactComponent as EditIcon } from '../../assets/icons/main_qna/iconEdit2.svg';
// @ts-ignore
import { ReactComponent as AddBookmarkIcon } from '../../assets/icons/main_qna/iconAddBookmark.svg';
// @ts-ignore
import { ReactComponent as BookmarkedIcon } from '../../assets/icons/main_qna/iconBookmarked2.svg';
// @ts-ignore
import { ReactComponent as AddTagIcon } from '../../assets/icons/main_qna/iconAddTag.svg';
// @ts-ignore
import { ReactComponent as ConfirmIcon } from '../../assets/icons/main_qna/iconCheck.svg';
// @ts-ignore
import { ReactComponent as CancelIcon } from '../../assets/icons/main_qna/iconCancel.svg';
import {
  selectCId,
  selectConversation,
} from '../../features/main/conversationSlice';
type Props = {
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
  // cId,
  // saved,
  // bookmarks,
  editState,
  setEditState,
  setEditConfirm,
}: Props) => {
  const [isHoverOpen, setIsHoverOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  // const bookmarks = useAppSelector(selectCBookmarks);
  const cId = useAppSelector(selectCId);
  const conv = useAppSelector(selectConversation);
  const saved = conv.saved;
  // const bookmarks = useAppSelector(selectConversation).bookmarks;

  useEffect(() => {
    console.log('saved status changed: ', saved);
  }, [conv]);
  const handleModalOpenClick = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    setPopoverOpen(false);
    setIsHoverOpen(true);
  };

  const handleEditClick = () => {
    setEditState(!editState);
  };

  const handleAddTagClick = () => {
    console.log('clicked add tag!');
    setIsHoverOpen(!isHoverOpen);
  };
  const handleSaveClick = () => {
    console.log('clicked save!');
    setIsHoverOpen(!isHoverOpen);
    setPopoverOpen(true);
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

  //to focus on title input when the edit status changes
  useEffect(() => {
    if (editState) {
      console.log('entered edit state!');
      const element = document.getElementById('titleInput') as HTMLInputElement;
      if (element) {
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
          {/* isHoverOpen &&{' '} */}
          {isHoverOpen ? (
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
          ) : (
            <CPopover
              className="popover_saveUI"
              // content="enter"
              content={
                <DialogBoxSaveBookmark setIsModalOpen={handleModalOpenClick} />
              }
              placement="bottom"
              trigger="click"
              visible={popoverOpen}
            >
              <IconItem>
                {saved ? (
                  <BookmarkedIcon onClick={handleSaveClick} />
                ) : (
                  <AddBookmarkIcon
                    onClick={handleSaveClick}
                    // onMouseEnter={handleHoverOpen}
                    // onMouseLeave={handleHoverOpen}
                  />
                )}
              </IconItem>
            </CPopover>
          )}
        </IconItems>
      )}
      <ModalCreateBookmark
        cId={cId}
        visible={isModalOpen}
        setVisible={handleModalOpenClick}
      />
    </EditSaveUIBox>
  );
};

export default EditSaveUI;
