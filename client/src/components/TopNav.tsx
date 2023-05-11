import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//상위 내비게이션 컴포넌트

const NavItemsBox = styled.div`
  padding-top: var(--padding-top-topnavitems);
  padding-bottom: var(--padding-top-topnavitems);
`;
const StyledSpan = styled.span`
  padding-right: var(--padding-right-topnavitems);
  color: var(--color-green);
  text-decoration: none;
  font-size: var(--size-font-link);
`;

const TopNav = () => {
  return (
    <NavItemsBox>
      <StyledSpan>
        <Link to="/">Main</Link>
      </StyledSpan>
      <StyledSpan>
        <Link to="/mypage">MyPage</Link>
      </StyledSpan>
      <StyledSpan>
        <Link to="/signup">Signup</Link>
      </StyledSpan>
      <StyledSpan>
        <Link to="/login">Login</Link>
      </StyledSpan>
      <StyledSpan>
        <Link to="/bookmarks">Bookmarks</Link>
      </StyledSpan>
    </NavItemsBox>
  );
};
export default TopNav;
