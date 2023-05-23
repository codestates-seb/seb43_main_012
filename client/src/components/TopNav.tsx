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
// @ts-ignore
import { ReactComponent as HistoryIcon } from '../assets/icons/topnav/iconHistory.svg';
// @ts-ignore
import { ReactComponent as ChatIcon } from '../assets/icons/topnav/iconNewChat.svg';
// @ts-ignore
import { ReactComponent as CollectionIcon } from '../assets/icons/topnav/iconCollectionsNew.svg';
// @ts-ignore
import { ReactComponent as AnonymousIcon } from '../assets/icons/topnav/iconNonMember.svg';

//import redux/api
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  UserInfo,
  selectMemberInfo,
  selectLoginState,
} from '../features/member/loginInfoSlice';
import { initializeConversation } from '../features/main/conversationSlice';
import {
  updateMemberInfo,
  changeLoginState,
} from '../features/member/loginInfoSlice';
const AvatarIcon = styled(Character)`
  background-color: var(--color-default-green-opacity);
  box-shadow: none;
  max-width: var(--size-avatar-default);
  max-height: var(--size-avatar-default);
  // :focus {
  //   padding: 2rem;
  //   transition: padding 0.2s ease-in-out;
  // }

  // img:focus {
  //   max-width: 106px;
  //   max-height: 106px;
  //   padding-bottom: 20px;
  //   transition: max-width 0.4s ease-in-out, max-height 0.4s ease-in-out,
  //     padding-bottom 0.3 ease-in-out;
  // }
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
    const userData: UserInfoItemTypes = await handleUserInfo(`user/${mId}`);
    // console.log(userData);
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
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (localStorage.getItem('memberId')) {
      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    console.log('topnav update');
    // console.log('memberavatar', _memberInfo.avatarLink);

    setMemberInfo({
      userId: _memberInfo.userId,
      username: _memberInfo.username,
      avatarLink: _memberInfo.avatarLink,
    });

    if (isLoggedIn !== _loginState) setIsLoggedIn(_loginState);
  }, [_loginState, _memberInfo.avatarLink]);

  // useEffect(() => {
  //   console.log('memberinfo update');
  //   setMemberInfo({ ...memberInfo, avatarLink: _memberInfo.avatarLink });
  // }, [_memberInfo.avatarLink]);

  // const fetchUserInfo = async () => {
  //   // if (!memberInfo.userId) return;
  //   setMemberInfo({...memberInfo, avatarLink: })
  //   try {
  //     // const userData: UserInfoItemTypes = await handleUserInfo(`user/${id}`);
  //     // console.log(userData);

  //     setMemberInfo({ ...memberInfo, avatarLink: userData.avatarLink });
  //     setAvatarLink(userData.avatarLink); // avatarLink에 값 설정
  //     setUsername(userData.username); // username 값 설정
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
    // if(!isLoggedIn) openLoginModal
    if (!isLoggedIn) setIsModalLoginOpen(true);
    if (isLoggedIn && !isUserDialogOpen) {
      setIsUserDialogOpen(true);
      console.log(`x: ${e.clientX}, y: ${e.clientY}`);
      setDialogPosition({ x: e.clientX, y: e.clientY + 10 });
    }
    if (isLoggedIn && isUserDialogOpen) {
      setIsUserDialogOpen(false);
    }
  };

  const handleChatBtnClick = () => {
    dispatch(initializeConversation(-1));
  };

  return (
    <TN.TopNavBox>
      <TN.LogoBox>
        <Link to="/">Chatcrawl</Link>
      </TN.LogoBox>
      <TN.NavIconsBox>
        <TN.AvatarBox className="navitem">
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
        </TN.AvatarBox>
        <TN.AvatarBox className="navitem">
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
        </TN.AvatarBox>

        <TN.AvatarBox className="navitem">
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
        </TN.AvatarBox>
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
