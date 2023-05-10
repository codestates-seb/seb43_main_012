import React from 'react';
import { Link } from 'react-router-dom';
import * as TN from '../styles/TopNavStyle';

const TopNavbar = () => {
  return (
    <div>
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
    </div>
  );
};

export default TopNavbar;
