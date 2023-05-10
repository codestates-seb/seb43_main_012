import React from 'react';
import { Link } from 'react-router-dom';
import * as TN from '../styles/TopNavStyle';

const TopNavbar = () => {
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
        <Link to="/bookmarks">Collections</Link>
      </TN.StyledSpan>
    </TN.NavItemsBox>
  );
};

export default TopNavbar;
