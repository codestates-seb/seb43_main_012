import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EditSaveUIBox } from '../../styles/MainStyle';

//import style
import '../../styles/sass/custom_popover_saveUI_hover.scss';
import { IconItems, IconItem } from '../../styles/IconStyle';
//import components
import ModalCreateBookmark from '../modals/ModalCreateBookmark';
import CheckCancelUI from '../uielements/CheckCancelUI';
import BookmarkHoverBtn from '../uielements/BookmarkHoverBtn';
import BookmarkClickBtn from '../uielements/BookmarkClickBtn';
import EditTitleHoverBtn from '../uielements/EditTitleHoverBtn';
import TagHoverBtn from '../uielements/TagHoverBtn';

//import redux
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectConversation } from '../../features/main/conversationSlice';

type Props = {
  editState: boolean;
  setEditState: Dispatch<SetStateAction<boolean>>;
  setEditConfirm: Dispatch<SetStateAction<boolean>>;
};

const EditSaveUI = ({ editState, setEditState, setEditConfirm }: Props) => {
  const [isHoverOpen, setIsHoverOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const conv = useAppSelector(selectConversation);
  const saved = conv.saved;

  useEffect(() => {
    console.log('saved status changed: ', saved);
  }, [conv]);
  const handleModalOpenClick = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    setPopoverOpen(false);
    setIsHoverOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setEditState(!editState);
  };

  const handleAddTagClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    console.log('clicked add tag!');
    setIsHoverOpen(!isHoverOpen);
  };
  const handleSaveClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
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
        <CheckCancelUI
          handleConfirm={handleConfirmClick}
          handleCancel={handleCancelClick}
        />
      ) : (
        <IconItems>
          <EditTitleHoverBtn handleEditClick={handleEditClick} />
          {isHoverOpen ? (
            <TagHoverBtn handleAddTagClick={handleAddTagClick} />
          ) : (
            <BookmarkClickBtn
              saved={saved}
              popoverOpen={popoverOpen}
              handleSaveClick={handleAddTagClick}
              setIsModalOpen={handleModalOpenClick}
            />
          )}
          {isHoverOpen ? (
            <BookmarkHoverBtn saved={saved} handleSaveClick={handleSaveClick} />
          ) : (
            <BookmarkClickBtn
              saved={saved}
              popoverOpen={popoverOpen}
              handleSaveClick={handleSaveClick}
              setIsModalOpen={handleModalOpenClick}
            />
          )}
        </IconItems>
      )}
      <ModalCreateBookmark
        visible={isModalOpen}
        setVisible={handleModalOpenClick}
      />
    </EditSaveUIBox>
  );
};

export default EditSaveUI;
