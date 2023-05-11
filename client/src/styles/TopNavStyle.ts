import styled from 'styled-components';

export const StyledSpan = styled.span`
  padding-right: var(--padding-right-topnavitems);
  color: var(--color-green);
  text-decoration: none;
  font-size: var(--text-fontsize-link);
`;

export const TopNavBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--size-minheight-topnav);
  z-index: 1000;
  min-height: var(--size-minheight-topnav);
  padding: var(--padding-top-topnavbox) var(--padding-left-topnavbox);
  font-size: var(--text-fontsize-link);
`;
export const LogoBox = styled.div`
  min-width: var(--size-minwidth-logo);
  min-height: 30px;
  color: var(--color-default-yellow);
  font-size: var(--text-fontsize-logo);
  font-weight: var(--text-fontweight-logo);
  letter-spacing: var(--text-letterspacing-logo);
  text-transform: uppercase;
`;

export const MemberBox = styled.div`
  min-width: var(--size-minwidth-logo);
`;

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: var(--size-avatar);
  height: var(--size-avatar);
  overflow: false;
  & .navitem {
    padding: 0 var(--padding-left-topnavitems);
  }
`;

export const NavIconsBox = styled.div`
  min-width: var(--size-minwiddth-topnavicons);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
