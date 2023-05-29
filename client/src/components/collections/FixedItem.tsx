import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as ThumbtackSolid } from '../../assets/icons/history/iconPinned.svg';

import { truncateTitle } from '../../utils/ContentFunctions';

import { Conversation, TagType } from '../../data/d';

type Props = {
  conversation: Conversation;
  handleContentClick: (cId: number) => void;
};

type StyledProps = {
  hovering: boolean;
};

const Content = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  flex-basis: 16rem;
  padding: 5px;
  border 1px solid #8dad84;
  border-radius: 10px;
  margin: 0 1.2% 1.2% 0;
  height: 200px;
  min-width: 100px;
  overflow: hidden;
  justify-content: space-between;
  font-stretch: condensed;
  text-align: center;
  word-break: keep-all;
  background: #f7fefa;

  .content {
    max-height: 8rem;
    overflow: hidden;
    line-height: 1.3rem;
    font-size: 0.9rem;
    &:hover{
      cursor: pointer;
    }
    /* text-overflow: ellipsis; */
  }

  .header {
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 20px 0;
  }
  .title {
    background:  url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=C9FFE0);
    margin: -6px -6px;
    padding: 2px 6px;
  }
  .buttons {
    display: flex;
    color: var(--color-default-yellow);
    align-items: flex-start;
    position: relative;
    top: -5px;
    svg {
      width: 24px;
      height: 24px;
      color: var(--color-default-yellow);
    }
  }

  .links {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 5px;
    font-weight: 500;
    font-size: 14px;
    div {
      padding: 2px 0;
    }
  }
  .bookmark {
    color: #18977b;
    font-weight: 600;
    font-size: 15px;

    span {
      padding-right: 10px;
    }
  }
  .tag {
    color: #7bb06e;
    font-weight: 500;
  }
`;

const FixedContent = styled(Content)`
  display: flex;
  flex-direction: column;
  min-width: 240px;
  max-height: 150px;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.hovering ? '#8BD396' : ' #c0d9b9')};
  border: ${(props) => (props.hovering ? '5px' : '1.5px')} solid
    ${(props) => (props.hovering ? '#79B582' : '#8dad84')};
  transition: border 0.2s ease, background 0.3s ease-in-out;

  .fixedUI {
    display: flex;
    width: 100%;
    height: 30px;
    color: #8dad84;
    // color: var(--color-default-yellow);
    justify-content: flex-end;
    align-items: flex-end;
    svg {
      width: 24px;
      height: 24px;
      color: #8dad84;
      // color: var(--color-default-yellow);
    }
  }

  .links {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-left: 10px;
    padding-bottom: 5px;
    font-weight: 500;
    font-size: 14px;
    div {
      padding: 2.5px 0;
    }
  }

  .bookmark {
    font-weight: 600;
    color: #18977b;
    // color: #DFFAD6;
  }

  .tag {
    color: #648061;
    font-weight: 500;
  }
`;

const FixedTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  // margin-top: 2rem;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 500;
  font-stretch: condensed;
  line-height: 1.5rem;
  background: url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=DFFAD6);
  &:hover {
    cursor: pointer;
  }
`;

const SvgButton = styled.button`
  width: 20px;
  border: none;
  margin: 0;
  background-color: transparent;
  cursor: pointer;
`;

const PinButton = () => {
  return (
    <SvgButton>
      <ThumbtackSolid />
    </SvgButton>
  );
};

const FixedItem = ({ conversation, handleContentClick }: Props) => {
  const [hovering, setHovering] = useState<boolean>(false);

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleContentClick(conversation.conversationId);
  };
  return (
    <FixedContent hovering={hovering}>
      <div className="fixedUI">
        <PinButton />
      </div>
      <FixedTitle
        key={conversation.conversationId}
        onClick={handleTitleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {truncateTitle(conversation.title, 30)}
      </FixedTitle>
      {/* <p>{getFirstSentence(conversation.answerSummary)}</p> */}

      <div className="links">
        <div className="bookmark">
          {conversation.bookmarks[0]?.bookmarkName}
        </div>
        <div className="tag">
          {conversation.tags.map((tag: TagType) => (
            <span key={tag.tagId}>#{tag.tagName} </span>
          ))}
        </div>
      </div>
    </FixedContent>
  );
};

export default FixedItem;
