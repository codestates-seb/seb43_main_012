import React from 'react';
import { Link } from 'react-router-dom';
import * as TN from '../styles/TopNavStyle';
//상위 내비게이션 컴포넌트

type TopNavProps = {
  showHistory: boolean;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;
  showPinnedItems: boolean;
  setShowPinnedItems: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopNav = ({ showHistory, setShowHistory, showPinnedItems, setShowPinnedItems }: TopNavProps) => {
  const handleHistoryBtnClick = () => {
    setShowHistory(!showHistory);
    if (showPinnedItems) setShowPinnedItems(false);
  };

  const handleCollectionsBtnClick = () => {
    setShowPinnedItems(!showPinnedItems);
    if (showHistory) setShowHistory(false);
  };

  return (
    <TN.TopNavBox>
      <TN.LogoBox>
        <Link to="/">Chatcrawl</Link>
      </TN.LogoBox>
      <TN.NavIconsBox>
        <span className="navitem" onClick={handleHistoryBtnClick}>
          <Link to="/">History</Link>
        </span>
        <span className="navitem">
          <Link to="/">New Chat</Link>
        </span>
        <span className="navitem" onClick={handleCollectionsBtnClick}>
          <Link to="/bookmarks">Collections</Link>
        </span>
      </TN.NavIconsBox>
      <TN.MemberBox>
        <TN.StyledSpan>
          <Link to="/mypage">MyPage</Link>
        </TN.StyledSpan>
        <TN.StyledSpan>
          <Link to="/signup">Signup</Link>
        </TN.StyledSpan>
      </TN.MemberBox>
    </TN.TopNavBox>
  );
};
export default TopNav;
