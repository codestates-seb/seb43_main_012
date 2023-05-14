import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

//import style
import * as TN from "../styles/TopNavStyle";
import { Character } from "../styles/CharacterStyle";

//import icons
// @ts-ignore
import { ReactComponent as HistoryIcon } from "../assets/icons/iconHistory.svg";
// @ts-ignore
import { ReactComponent as ChatIcon } from "../assets/icons/iconNewChat.svg";
// @ts-ignore
import { ReactComponent as CollectionIcon } from "../assets/icons/iconCollectionsNew.svg";
// @ts-ignore
import { ReactComponent as AnonymousIcon } from "../assets/icons/iconNonMember.svg";

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
type TopNavProps = {
  showHistory: boolean;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  showPinnedItems: boolean;
  setShowPinnedItems: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  isUserDialogOpen: boolean;
  setIsUserDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDialogPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setIsModalLoginOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopNav = ({
  showHistory,
  setShowHistory,
  showPinnedItems,
  setShowPinnedItems,
  isLoggedIn,
  isUserDialogOpen,
  setIsUserDialogOpen,
  setIsModalLoginOpen,
  setDialogPosition,
}: TopNavProps) => {
  const handleHistoryBtnClick = () => {
    setShowHistory(!showHistory);
    if (showPinnedItems) setShowPinnedItems(false);
  };

  const handleCollectionsBtnClick = () => {
    setShowPinnedItems(!showPinnedItems);
    if (showHistory) setShowHistory(false);
  };

  const handleNewChatBtnClick = () => {
    if (showPinnedItems) setShowPinnedItems(false);
    if (showHistory) setShowHistory(false);
  };

  const handleUserBtnClick = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
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

  //홈 버튼 누를때나 새채팅창 누를때, autofocus 키기
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const element = document.getElementById(
        "questionInput",
      ) as HTMLInputElement | null;
      if (element) {
        console.log("element found!");
        element.focus();
      }
      // navigate(0);
    }
  }, [location]);

  return (
    <TN.TopNavBox>
      <TN.LogoBox>
        <Link to="/">Chatcrawl</Link>
      </TN.LogoBox>
      <TN.NavIconsBox>
        <TN.AvatarBox className="navitem" onClick={handleHistoryBtnClick}>
          <Link to="/">
            <HistoryIcon className="svg" />
          </Link>
        </TN.AvatarBox>
        <TN.AvatarBox className="navitem" onClick={handleNewChatBtnClick}>
          <Link to="/">
            <ChatIcon className="svg center" />
          </Link>
        </TN.AvatarBox>
        <TN.AvatarBox className="navitem" onClick={handleCollectionsBtnClick}>
          <Link to="/bookmarks">
            <CollectionIcon className="svg" />
          </Link>
        </TN.AvatarBox>
      </TN.NavIconsBox>
      <TN.MemberBox>
        {isLoggedIn ? (
          <AvatarIcon onClick={handleUserBtnClick}>
            <img src="/character1.png" alt="AvatarIcon A" />
          </AvatarIcon>
        ) : (
          <AnonymousIcon className="svg" onClick={handleUserBtnClick} />
        )}
      </TN.MemberBox>
    </TN.TopNavBox>
  );
};
export default TopNav;
