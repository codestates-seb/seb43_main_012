import React from 'react';
import { Link } from 'react-router-dom';

//import style
import * as TN from '../styles/TopNavStyle';

//import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical, faClockRotateLeft, faBookBookmark, faBook } from '@fortawesome/free-solid-svg-icons';
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
// <FontAwesomeIcon icon={duotone('message-plus')} />;
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import bookmarkIcon from '../assets/icons/iconCollectionsNew.svg';
import historyIcon from '../assets/icons/iconHistory.svg';
import chatIcon from '../assets/icons/iconNewChat.svg';

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
        <TN.AvatarBox className="navitem" onClick={handleHistoryBtnClick}>
          <Link to="/">
            <img src={historyIcon} style={{ width: 59, height: 59 }} />
            {/* <FontAwesomeIcon icon={faClockRotateLeft as IconProp} /> */}
          </Link>
        </TN.AvatarBox>
        <TN.AvatarBox className="navitem">
          <Link to="/">
            <img src={chatIcon} style={{ width: 59, height: 59 }} />
            {/* <FontAwesomeIcon icon={faCommentMedical as IconProp} /> */}
          </Link>
        </TN.AvatarBox>
        <TN.AvatarBox className="navitem" onClick={handleCollectionsBtnClick}>
          <Link to="/bookmarks">
            <img src={bookmarkIcon} style={{ width: 54, height: 54 }} />
            {/* <FontAwesomeIcon icon={faBookBookmark as IconProp} /> */}
          </Link>
        </TN.AvatarBox>
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
