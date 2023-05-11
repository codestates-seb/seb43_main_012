import React, { useState } from 'react';
import { DialogBox, UserInfo } from '../../styles/TopNavStyle';
import styled from 'styled-components';

type BoxProps = {
  dialogPosition: { x: number; y: number };
};

type StyleProps = {
  posX: number;
  posY: number;
};

const MovingDialogBox = styled(DialogBox)<StyleProps>`
  z-index: 1000;
  left: ${p => p.posX - 200}px;
  top: ${p => p.posY}px;
  width: 200px;
  height: 100px;
  background: white;
`;

const DialogBoxUserIcon = ({ dialogPosition }: BoxProps) => {
  console.log(`x: ${dialogPosition.x} `);
  return (
    <MovingDialogBox posX={dialogPosition.x} posY={dialogPosition.y}>
      <UserInfo>DialogBoxUserIcon</UserInfo>
    </MovingDialogBox>
  );
};

export default DialogBoxUserIcon;
