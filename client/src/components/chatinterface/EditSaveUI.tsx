import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { EditSaveUIBox } from '../../styles/MainStyle';

type Props = {
  editState: boolean;
  setEditState: Dispatch<SetStateAction<boolean>>;
  setEditConfirm: Dispatch<SetStateAction<boolean>>;
};
const EditSaveUI = ({ editState, setEditState, setEditConfirm }: Props) => {
  const handleConfirmClick = () => {
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
          <button onClick={handleConfirmClick}>confirm</button>
          <button onClick={handleCancelClick}>cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEditClick}>edit</button>
          <button>tag</button>
          <button>save</button>
        </>
      )}
    </EditSaveUIBox>
  );
};

export default EditSaveUI;
