import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EditSaveUIBox } from '../../styles/MainStyle';

//import style
import { IconItems, IconItem } from '../../styles/IconStyle';
//import components
import ModalCreateBookmark from '../modals/ModalCreateBookmark';
import CheckCancelUI from '../uielements/CheckCancelUI';
import BookmarkHoverBtn from '../uielements/BookmarkHoverBtn';
import BookmarkClickBtn from '../uielements/BookmarkClickBtn';
import EditTitleHoverBtn from '../uielements/EditTitleHoverBtn';
import TagHoverBtn from '../uielements/TagHoverBtn';
import TagClickBtn from '../uielements/TagClickBtn';

//import redux
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectConversation } from '../../features/main/conversationSlice';

type Props = {
  editState: boolean;
  setEditState: Dispatch<SetStateAction<boolean>>;
  setEditConfirm: Dispatch<SetStateAction<boolean>>;
};

const EditSaveUI = ({ editState, setEditState, setEditConfirm }: Props) => {
  const [isBHoverOpen, setIsBHoverOpen] = useState<boolean>(true);
  const [isTHoverOpen, setIsTHoverOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bPopoverOpen, setBPopoverOpen] = useState<boolean>(false);
  const [tPopoverOpen, setTPopoverOpen] = useState<boolean>(false);
  const conv = useAppSelector(selectConversation);

  useEffect(() => {
    // console.log('saved status changed: ', saved);
  }, [conv]);

  const handleModalOpenClick = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    setBPopoverOpen(false);
    setIsBHoverOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setEditState(!editState);
    if (bPopoverOpen) setBPopoverOpen(false);
    if (tPopoverOpen) setTPopoverOpen(false);
  };

  const handleAddTagClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('clicked add tag!');
    setTPopoverOpen(true);
    setIsTHoverOpen(!isTHoverOpen);
    if (bPopoverOpen) setBPopoverOpen(false);
  };
  const handleSaveClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('clicked save!');
    setBPopoverOpen(true);
    setIsBHoverOpen(!isBHoverOpen);
    if (tPopoverOpen) setTPopoverOpen(false);
  };
  const handleConfirmClick = (e: React.MouseEvent<Element>) => {
    // console.log('confirm click!');
    e.preventDefault();
    e.stopPropagation();
    setEditConfirm(true);
    setEditState(!editState);
  };

  const handleCancelClick = (e: React.MouseEvent<Element>) => {
    e.preventDefault();
    e.stopPropagation();
    setEditConfirm(false);
    setEditState(!editState);
  };

  //to focus on title input when the edit status changes
  useEffect(() => {
    if (editState) {
      // console.log('entered edit state!');
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
        <CheckCancelUI
          handleConfirm={handleConfirmClick}
          handleCancel={handleCancelClick}
        />
      ) : (
        <IconItems>
          <EditTitleHoverBtn handleEditClick={handleEditClick} />
          {isTHoverOpen ? (
            <TagHoverBtn
              saved={Boolean(conv.tags.length)}
              handleAddTagClick={handleAddTagClick}
            />
          ) : (
            <TagClickBtn
              saved={Boolean(conv.tags.length)}
              popoverOpen={tPopoverOpen}
              handleSaveClick={handleAddTagClick}
            />
          )}
          {isBHoverOpen ? (
            <BookmarkHoverBtn
              saved={Boolean(conv.bookmarks.length)}
              handleSaveClick={handleSaveClick}
            />
          ) : (
            <BookmarkClickBtn
              saved={Boolean(conv.bookmarks.length)}
              popoverOpen={bPopoverOpen}
              handleSaveClick={handleSaveClick}
              setIsModalOpen={handleModalOpenClick}
            />
          )}
        </IconItems>
      )}
      <ModalCreateBookmark
        visible={isModalOpen}
        setVisible={handleModalOpenClick}
        mode="addConversation"
      />
    </EditSaveUIBox>
  );
};

export default EditSaveUI;
