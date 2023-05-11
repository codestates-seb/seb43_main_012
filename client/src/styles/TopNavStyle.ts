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
  min-width: var(--size-avatar);
  min-height: var(--size-avatar);
  padding: 0 20px;
  overflow: false;
  & .navitem {
    padding: 0 var(--padding-left-topnavitems);
  }
  .svg {
    width: var(--size-avatar-default);
    transition: width 0.1s ease-in-out;
  }

  .svg:hover {
    width: var(--size-avatar-hover);
    filter: invert(25%) sepia(80%) saturate(1.3);
    // fill: blue;
    transition: width 0.2s ease-in-out;
  }

  .center {
    width: var(--size-avatar-center);
  }
  .center:hover {
    width: var(--size-avatar-center-hover);
  }
`;

export const NavIconsBox = styled.div`
  min-width: var(--size-minwiddth-topnavicons);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
