import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

//import components
import { CPopover } from '@coreui/react';
import { UserInfoItemTypes, handleUserInfo } from '../api/MemberApi';
//import functions
import { formatDateTime } from './member/LoginForm';
//import style
import styled from 'styled-components';
import * as TN from '../styles/TopNavStyle';
import { Character } from '../styles/CharacterStyle';

//import icons
import { ReactComponent as HistoryIcon } from '../assets/icons/topnav/iconHistory.svg';
import { ReactComponent as ChatIcon } from '../assets/icons/topnav/iconNewChat.svg';
import { ReactComponent as CollectionIcon } from '../assets/icons/topnav/iconCollectionsNew.svg';
import { ReactComponent as AnonymousIcon } from '../assets/icons/topnav/iconNonMember.svg';

//import redux/api
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  UserInfo,
  selectMemberInfo,
  selectLoginState,
  initializeMemberState,
} from '../features/member/loginInfoSlice';
import { initializeConversation } from '../features/main/conversationSlice';
import { toggleModal } from '../features/collection/collectionSlice';
import {
  updateMemberInfo,
  changeLoginState,
} from '../features/member/loginInfoSlice';
import { setCollectionBookmark } from '../features/collection/collectionSlice';

const AvatarIcon = styled(Character)`
  background-color: var(--color-default-green-opacity);
  box-shadow: none;
  max-width: var(--size-avatar-default);
  max-height: var(--size-avatar-default);
  margin: 0;
`;

const navTooltip = {
  position: 'absolute',
  inset: '0px auto auto 0px',
  transform: 'translate3d(315.5px, 84.5px, 0px)',
  background: 'purple',
  color: 'white',
};

type TopNavProps = {
  isUserDialogOpen: boolean;
  setIsUserDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setIsModalLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type MemberInfoType = {
  userId: number;
  username: string;
  avatarLink: string;
};

const TopNav = ({
  isUserDialogOpen,
  setIsUserDialogOpen,
  setIsModalLoginOpen,
  setDialogPosition,
}: TopNavProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const _memberInfo = useAppSelector(selectMemberInfo);
  const _loginState = useAppSelector(selectLoginState);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(_loginState);
  const [memberInfo, setMemberInfo] = useState<MemberInfoType>({
    userId: _memberInfo.userId,
    username: _memberInfo.username,
    avatarLink: _memberInfo.avatarLink,
  });

  const fetchUserInfo = async () => {
    const mId = localStorage.getItem('memberId');
    try {
      const userData: UserInfoItemTypes = await handleUserInfo(`user/${mId}`);
      const date: number[] = userData.createdAt;
      dispatch(
        updateMemberInfo({
          userId: userData.id,
          userEmail: userData.userId,
          username: userData.username,
          avatarLink: userData.avatarLink,
          createdDate: formatDateTime(userData.createdAt),
        }),
      );
      dispatch(changeLoginState('ON'));
    } catch (err) {
      console.log('fetch user error');
      localStorage.clear();
      dispatch(initializeMemberState);
      navigate('/');
      throw err;
    }
    // console.log(userData);
  };

  //홈 버튼 누를때나 새채팅창 누를때, autofocus 키기
  useEffect(() => {
    if (location.pathname === '/') {
      const element = document.getElementById(
        'questionInput',
      ) as HTMLInputElement | null;
      if (element) {
        element.focus();
      }
      dispatch(toggleModal(true));
    } else if (location.pathname === '/collection') {
      dispatch(toggleModal(false));
      dispatch(setCollectionBookmark('All'));
    } else if (location.pathname === '/history') {
      dispatch(toggleModal(false));
    }
  }, [location]);

  useEffect(() => {
    if (!!localStorage.getItem('isLoggedIn')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (localStorage.getItem('memberId')) {
      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    // console.log('topnav update');
    // console.log('memberavatar', _memberInfo.avatarLink);
    if (
      isLoggedIn !== _loginState ||
      memberInfo.avatarLink !== _memberInfo.avatarLink
    ) {
      setIsLoggedIn(_loginState);
      setMemberInfo({
        userId: _memberInfo.userId,
        username: _memberInfo.username,
        avatarLink: _memberInfo.avatarLink,
      });
    }
  }, [_loginState, _memberInfo.avatarLink]);

  const handleAnonymousClick = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsModalLoginOpen(true);
  };

  const handleUserBtnClick = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!isLoggedIn) setIsModalLoginOpen(true);
    if (isLoggedIn && !isUserDialogOpen) {
      setIsUserDialogOpen(true);
      setDialogPosition({ x: e.clientX, y: e.clientY + 10 });
    }
    if (isLoggedIn && isUserDialogOpen) {
      setIsUserDialogOpen(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      const element = document.getElementById(
        'questionInput',
      ) as HTMLInputElement | null;
      if (element) {
        element.focus();
      }
    }
  }, [location]);

  let Id: any = 0;
  if (localStorage.getItem('memberId')) {
    Id = localStorage.getItem('memberId');
  } else {
    Id = 0;
  }

  const handleChatBtnClick = () => {
    dispatch(initializeConversation(-1));
  };

  return (
    <TN.TopNavBox>
      <TN.LogoBox>
        <Link to="/">Chatcrawl</Link>
      </TN.LogoBox>
      <TN.NavIconsBox>
        <TN.IconBox className="navitem">
          <Link to="/history">
            <CPopover
              className="popover_topnav"
              content="history"
              placement="bottom"
              trigger="hover"
            >
              <div>
                <HistoryIcon
                  className="svg"
                  onClick={isLoggedIn ? undefined : handleAnonymousClick}
                />
              </div>
            </CPopover>
          </Link>
        </TN.IconBox>
        <TN.IconBox className="navitem">
          <Link to="/">
            <CPopover
              className="popover_topnav"
              content="new chat"
              placement="bottom"
              trigger="hover"
            >
              <div>
                <ChatIcon
                  className="svg center"
                  onClick={
                    isLoggedIn ? handleChatBtnClick : handleAnonymousClick
                  }
                />
              </div>
            </CPopover>
          </Link>
        </TN.IconBox>

        <TN.IconBox className="navitem">
          <Link to="/collection">
            <CPopover
              className="popover_topnav"
              content="collections"
              placement="bottom"
              trigger="hover"
            >
              <div>
                <CollectionIcon
                  className="svg"
                  onClick={isLoggedIn ? undefined : handleAnonymousClick}
                />
              </div>
            </CPopover>
          </Link>
        </TN.IconBox>
      </TN.NavIconsBox>
      <TN.MemberBox>
        {isLoggedIn ? (
          <AvatarIcon onClick={handleUserBtnClick}>
            {memberInfo.avatarLink === memberInfo.username ? (
              memberInfo.username[0]?.toUpperCase()
            ) : (
              <img src={memberInfo.avatarLink} alt="AvatarIcon A" />
            )}
          </AvatarIcon>
        ) : (
          <AnonymousIcon className="svg" onClick={handleUserBtnClick} />
        )}
      </TN.MemberBox>
    </TN.TopNavBox>
  );
};
export default TopNav;
