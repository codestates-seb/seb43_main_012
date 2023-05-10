import React from 'react';
import { Link } from 'react-router-dom';
import * as TN from '../styles/TopNavStyle';
//상위 내비게이션 컴포넌트

const TopNav = () => {
  return (
    <TN.NavItemsBox>
      <TN.StyledSpan>
        <Link to="/">Main</Link>
      </TN.StyledSpan>
      <TN.StyledSpan>
        <Link to="/mypage">MyPage</Link>
      </TN.StyledSpan>
      <TN.StyledSpan>
        <Link to="/signup">Signup</Link>
      </TN.StyledSpan>
      <TN.StyledSpan>
        <Link to="/bookmarks">Bookmarks</Link>
      </TN.StyledSpan>
    </TN.NavItemsBox>
  );
};
export default TopNav;
