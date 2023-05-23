import React from 'react';
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
};
const HistoryEditUI = ({ pinned }: Props) => {
  return (
    <EditUIBox>
      {pinned ? <PinnedIcon /> : <PinIcon />}
      <DeleteIcon />
    </EditUIBox>
  );
};

export default HistoryEditUI;
