import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DialogBox,
  UserInfo,
  UserCreatedDate,
  DialogItems,
  DialogSelectItem,
  SignOutFooter,
  SignoutItem,
  EmailItem,
} from '../../styles/TopNavStyle';
import { ModalBackdrop } from '../../styles/CharacterStyle';
import styled from 'styled-components';
import { logoutApi } from '../../api/LogoutApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  changeLoginState,
  selectMemberInfo,
} from '../../features/member/loginInfoSlice';
import { useSelector } from 'react-redux';

type BoxProps = {
  dialogPosition: { x: number; y: number };
  setIsUserDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type StyleProps = {
  posX: number;
  posY: number;
};

const MovingDialogBox = styled(DialogBox)<StyleProps>`
  z-index: 1100;
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
}: BoxProps) => {
  const mInfo = useSelector(selectMemberInfo);

  const handleDialogItemClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    //close modal
    e.stopPropagation();
    console.log('dialog item clicked!');
    if (setIsUserDialogOpen) setIsUserDialogOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      await logoutApi(`logout`);
      dispatch(changeLoginState('OFF'));
      navigate(`/`);
      if (setIsUserDialogOpen) setIsUserDialogOpen(false);
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error(error);
      if (setIsUserDialogOpen) setIsUserDialogOpen(false);
      alert('잠시 후 다시 시도해 주세요.');
    }
  };

  const handleModalBackdropClick = () => {
    if (setIsUserDialogOpen) setIsUserDialogOpen(false);
  };

  return (
    <>
      <BoxBackdrop onClick={handleModalBackdropClick} />
      <MovingDialogBox posX={dialogPosition.x} posY={dialogPosition.y}>
        <UserInfo>
          {Boolean(mInfo.userId) && (
            <UserCreatedDate>
              {`✨ Member since ${mInfo.createdDate}`}
            </UserCreatedDate>
          )}
          <DialogItems>
            <DialogSelectItem onClick={handleDialogItemClick}>
              <Link to="/mypage">Profile</Link>
            </DialogSelectItem>
            <DialogSelectItem onClick={handleDialogItemClick}>
              <Link to="/collection">Library</Link>
            </DialogSelectItem>
            <DialogSelectItem>Public Chats</DialogSelectItem>
          </DialogItems>
          <SignOutFooter>
            <DialogSelectItem onClick={handleDialogItemClick}>
              <Link to="/serviceIntro">Start Guide</Link>
            </DialogSelectItem>
            <SignoutItem onClick={handleLogout}>Sign Out</SignoutItem>
            {Boolean(mInfo.userId) && <EmailItem>{mInfo.userEmail}</EmailItem>}
          </SignOutFooter>
        </UserInfo>
      </MovingDialogBox>
    </>
  );
};

export default DialogBoxUserIcon;
