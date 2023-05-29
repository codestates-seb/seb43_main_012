import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as DeleteIcon } from '../../assets/icons/history/iconDelete.svg';
import { ReactComponent as PinnedIcon } from '../../assets/icons/history/iconPinned.svg';
import { ReactComponent as PinIcon } from '../../assets/icons/history/iconPinOff.svg';
import { ReactComponent as ConfirmIcon } from '../../assets/icons/history/iconCheckAlternative.svg';
import { ReactComponent as CancelIcon } from '../../assets/icons/main_qna/iconCancel.svg';

type StyleProps = {
  hovering: boolean;
};

const EditUIBox = styled.div<StyleProps>`
  color: ${(props) =>
    props.hovering
      ? 'var(--color-default-yellow-darker)'
      : 'var(--color-default-yellow)'};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  transition: color 0.3s ease-in-out;

  div {
    display: flex;
    flex-direction: row;
  }
  svg {
    width: 24px;
    height: 24px;
    display: flex;
  }
  svg:hover {
    color: #fcfc88;
    path {
      stroke-width: 2;
    }
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
  hovering: boolean;
  setHovering: React.Dispatch<React.SetStateAction<boolean>>;
};
const HistoryEditUI = ({
  pinned,
  handlePinUpdate,
  handleDeleteConv,
  hovering,
  setHovering,
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
    <EditUIBox hovering={hovering}>
      {aboutToDelete ? (
        <ConfirmCancelBox>
          <div>{`DELETE ?`}</div>
          <>
            <ConfirmIcon onClick={handleConfirmClick} />
            <CancelIcon onClick={handleCancelClick} />
          </>
        </ConfirmCancelBox>
      ) : (
        <div
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {isPinned ? (
            <PinnedIcon onClick={handlePinClick} />
          ) : (
            <PinIcon onClick={handlePinClick} />
          )}
          <DeleteIcon onClick={handleDeleteClick} />
        </div>
      )}
    </EditUIBox>
  );
};

export default HistoryEditUI;
