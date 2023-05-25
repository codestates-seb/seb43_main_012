import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as DeleteIcon } from '../../assets/icons/history/iconDelete.svg';
import { ReactComponent as PinnedIcon } from '../../assets/icons/history/iconPinned.svg';
import { ReactComponent as PinIcon } from '../../assets/icons/history/iconPinOff.svg';
import { ReactComponent as ConfirmIcon } from '../../assets/icons/history/iconCheckAlternative.svg';
import { ReactComponent as CancelIcon } from '../../assets/icons/main_qna/iconCancel.svg';

const EditUIBox = styled.div`
  color: var(--color-default-yellow);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  svg {
    width: 24px;
    height: 24px;
    display: flex;
  }
  svg:hover {
    color: var(--color-default-yellow-darker);
    path {
      stroke-width: 2;
    }
    // color: var(--color-default-green);
  }
`;

const ConfirmCancelBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: var(--color-error);
  font-size: 14px;
  font-weight: 600;

  //   svg {
  //     path {
  //       stroke-width: 3;
  //     }
  //   }

  svg:hover {
    path {
      color: var(--color-error);
      stroke-width: 3;
    }
    // color: darkred !important;
  }
`;

type Props = {
  pinned: boolean;
  handlePinUpdate: (newPinValue: boolean) => void;
  handleDeleteConv: () => void;
};
const HistoryEditUI = ({
  pinned,
  handlePinUpdate,
  handleDeleteConv,
}: Props) => {
  const [aboutToDelete, setAboutToDelete] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(pinned);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAboutToDelete(true);
  };
  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPinned(!isPinned);
    handlePinUpdate(!isPinned);
  };

  const handleConfirmClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleDeleteConv();
    setAboutToDelete(false);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAboutToDelete(false);
  };

  return (
    <EditUIBox>
      {aboutToDelete ? (
        <ConfirmCancelBox>
          <div>{`DELETE ?`}</div>
          <>
            <ConfirmIcon onClick={handleConfirmClick} />
            <CancelIcon onClick={handleCancelClick} />
          </>
        </ConfirmCancelBox>
      ) : (
        <>
          {isPinned ? (
            <PinnedIcon onClick={handlePinClick} />
          ) : (
            <PinIcon onClick={handlePinClick} />
          )}
          <DeleteIcon onClick={handleDeleteClick} />
        </>
      )}
    </EditUIBox>
  );
};

export default HistoryEditUI;
