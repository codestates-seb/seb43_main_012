import React from 'react';
import { Link } from 'react-router-dom';
import * as TN from '../styles/TopNavStyle';
//상위 내비게이션 컴포넌트

const TopNav = () => {
  return (
    <TN.TopNavBox>
      <TN.LogoBox>
        <Link to="/">Chatcrawl</Link>
      </TN.LogoBox>
      <TN.NavIconsBox>
        <span className="navitem">
          <Link to="/">History</Link>
        </span>
        <span className="navitem">
          <Link to="/">New Chat</Link>
        </span>
        <span className="navitem">
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
