import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DialogBox,
  UserInfo,
  UserCreatedDate,
  DialogItems,
  DialogSelectItem,
  SignOutFooter,
  SignoutItem,
  EmailItem,
} from "../../styles/TopNavStyle";
import { ModalBackdrop } from "../../styles/CharacterStyle";
import styled from "styled-components";

type BoxProps = {
  dialogPosition: { x: number; y: number };
  setIsUserDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type StyleProps = {
  posX: number;
  posY: number;
};

const MovingDialogBox = styled(DialogBox)<StyleProps>`
  z-index: 1000;
  left: ${(p) => p.posX - 250}px;
  top: ${(p) => p.posY}px;
  background: white;
`;

const BoxBackdrop = styled(ModalBackdrop)`
  background: transparent;
  z-index: 999;
`;

const DialogBoxUserIcon = ({
  dialogPosition,
  setIsUserDialogOpen,
  setIsLoggedIn,
}: BoxProps) => {
  console.log(`x: ${dialogPosition.x} `);

  const handleDialogItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    //close modal
    console.log("dialog item clicked!");
    setIsUserDialogOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserDialogOpen(false);
  };

  const handleModalBackdropClick = () => {
    setIsUserDialogOpen(false);
  };

  return (
    <>
      <BoxBackdrop onClick={handleModalBackdropClick} />
      <MovingDialogBox posX={dialogPosition.x} posY={dialogPosition.y}>
        <UserInfo>
          <UserCreatedDate>✨ Member since Apr 2023</UserCreatedDate>
          <DialogItems>
            <DialogSelectItem onClick={handleDialogItemClick}>
              <Link to="/mypage">Profile</Link>
            </DialogSelectItem>
            <DialogSelectItem onClick={handleDialogItemClick}>
              <Link to="/bookmarks">Library</Link>
            </DialogSelectItem>
            <DialogSelectItem>Public Chats</DialogSelectItem>
          </DialogItems>
          <SignOutFooter>
            <DialogSelectItem>Getting Started</DialogSelectItem>
            <SignoutItem onClick={handleLogout}>Sign Out</SignoutItem>
            <EmailItem>sunga.jlh@gmail.com</EmailItem>
          </SignOutFooter>
        </UserInfo>
      </MovingDialogBox>
    </>
  );
};

export default DialogBoxUserIcon;