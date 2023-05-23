import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as DeleteIcon } from '../../assets/icons/history/iconDelete.svg';
import { ReactComponent as PinnedIcon } from '../../assets/icons/history/iconPinned.svg';
import { ReactComponent as PinIcon } from '../../assets/icons/history/iconPinOff.svg';

const EditUIBox = styled.div`
  color: var(--color-default-yellow);
  display: flex;
  flex-direction: row;
  //   width: 100%;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  svg {
    width: 24px;
    height: 24px;
    display: flex;
  }
  svg:hover {
    // color: var(--color-default-yellow-darker);
    color: var(--color-default-green);
    // color: black;
  }
`;

type Props = {
  pinned: boolean;
  handlePinUpdate: (newPinValue: boolean) => void;
};
const HistoryEditUI = ({ pinned, handlePinUpdate }: Props) => {
  const [isPinned, setIsPinned] = useState(pinned);

  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPinned(!isPinned);
    handlePinUpdate(!isPinned);
  };

  return (
    <EditUIBox>
      {isPinned ? (
        <PinnedIcon onClick={handlePinClick} />
      ) : (
        <PinIcon onClick={handlePinClick} />
      )}
      <DeleteIcon />
    </EditUIBox>
  );
};

export default HistoryEditUI;
