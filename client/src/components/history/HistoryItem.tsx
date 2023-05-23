import React, { useState } from 'react';
import styled from 'styled-components';

import { ConversationThumbType } from '../../data/d';
import { truncateTitle } from '../../utils/ContentFunctions';
import HistoryEditUI from './HistoryEditUI';

// import { useAppDispatch } from '../../app/hooks';
// import { updatePinAsync } from '../../features/main/conversationSlice';
import { updatePinState, deleteConversation } from '../../api/ChatInterfaceApi';
import { initializeConversation } from '../../features/main/conversationSlice';

type Props = {
  conversation: ConversationThumbType;
  handleClick: (cId: number) => void;
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px 5px 5px 5px;
  border: 1.5px solid var(--color-default-yellow);
  background-color: var(--color-thumbnail-bg);
  border-radius: 10px;
  margin: 0 0.5%;
  // margin-bottom: 10px;
  position: relative;

  min-width: 270px;
  min-height: 150px;
  max-height: 170px;
  overflow-y: hidden;

  p {
    max-height: 7rem;
    text-align: left;
    word-break: break-all;
  }

  .fixed {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .header {
    display: flex;
    justify-content: center;
    align-content: center;
    height: 75px;
    flex-wrap: wrap;
    // background-color: green;
    // background-color: var(--color-thumbnail-bg);
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-overflow: ellipsis;
    height: fit-content;

    font-size: 18px;
    line-height: 1.5rem;
    font-weight: 500;
    font-stretch: condensed;
    text-align: center;
    // white-space: pre-wrap;
    max-width: 230px;
    max-height: 80px;
    padding: 10px;

    background: url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=fcfc88);
    margin: -6px -6px;
    padding: 2px 6px;
    cursor: pointer;

    //highlight
    // background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMjAwMTA5MDQvL0VOIgogICAgICAgICAgICAgICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+Cgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgICB3aWR0aD0iMWluIiBoZWlnaHQ9IjAuNWluIgogICAgIHZpZXdCb3g9IjAgMCAzMDAgMTUwIj4KICA8cGF0aAogICAgICAgIGZpbGw9IiNmZmUwMDAiIHN0cm9rZT0ibm9uZSIKICAgICAgICBkPSJNIDEyLjAwLDQ4LjAwCiAgICAgICAgICAgQyAxMi4wMCw1MC4wOSAxMS43OSw1NC45OSAxMi42MCw1Ni43MgogICAgICAgICAgICAgMTUuNTksNjMuMTggMjYuMDksNTYuNjQgMzMuMDAsNjMuMDAKICAgICAgICAgICAgIDMwLjg0LDYzLjE4IDIzLjA1LDYzLjg3IDIxLjgwLDY1LjAyCiAgICAgICAgICAgICAxOC4wMiw2Ny44OCAyMS4yOSw3Ni4zNSAyMS44MCw4MC4wMAogICAgICAgICAgICAgMjEuODAsODAuMDAgMjEuODAsODYuMDAgMjEuODAsODYuMDAKICAgICAgICAgICAgIDIxLjgwLDg2LjAwIDQwLjAwLDg3LjAwIDQwLjAwLDg3LjAwCiAgICAgICAgICAgICAzOS45Myw4OC44OCA0MC4wNiw5MS4wNCAzOC45OCw5Mi42OQogICAgICAgICAgICAgMzcuNTEsOTQuOTMgMzUuMTUsOTQuNzUgMzIuNTksOTYuMjAKICAgICAgICAgICAgIDI4LjMzLDk4LjYxIDI2Ljg3LDEwMi4yMiAyNy4zNCwxMDcuMDAKICAgICAgICAgICAgIDI3LjM0LDEwNy4wMCAzMC4wMiwxMjMuNDEgMzAuMDIsMTIzLjQxCiAgICAgICAgICAgICAzMS44MiwxMjUuNzUgNDAuMDEsMTI3Ljk1IDQzLjAwLDEyOC4wMAogICAgICAgICAgICAgNDMuMDAsMTI4LjAwIDg3LjAwLDEyOC4wMCA4Ny4wMCwxMjguMDAKICAgICAgICAgICAgIDg4LjA4LDEyMS41NiA5MS4xNiwxMjEuODAgOTcuMDAsMTIyLjA0CiAgICAgICAgICAgICA5Ny4wMCwxMjIuMDQgMTA5LjAwLDEyMy4wMCAxMDkuMDAsMTIzLjAwCiAgICAgICAgICAgICAxMDkuMDAsMTIzLjAwIDEyOC4wMCwxMjMuMDAgMTI4LjAwLDEyMy4wMAogICAgICAgICAgICAgMTI4LjAwLDEyMy4wMCAxODIuMDAsMTIyLjAwIDE4Mi4wMCwxMjIuMDAKICAgICAgICAgICAgIDE5NC41OCwxMjEuOTcgMTg4LjQyLDExOS4wMyAyMDEuMDAsMTE5LjAwCiAgICAgICAgICAgICAyMDEuMDAsMTE5LjAwIDI0My4wMCwxMTkuMDAgMjQzLjAwLDExOS4wMAogICAgICAgICAgICAgMjQzLjAwLDExOS4wMCAyNTguMDAsMTE4LjAwIDI1OC4wMCwxMTguMDAKICAgICAgICAgICAgIDI1OS41MywxMDkuMTAgMjY2LjAxLDExMy4zNyAyNzAuNDAsMTA5LjE1CiAgICAgICAgICAgICAyNzIuNjEsMTA3LjAzIDI3Mi4zMCwxMDAuODUgMjcyLjAwLDk4LjAwCiAgICAgICAgICAgICAyNzIuMDAsOTguMDAgMjgwLjAwLDk3LjAwIDI4MC4wMCw5Ny4wMAogICAgICAgICAgICAgMjgwLjAwLDk0LjEwIDI4MC4yNiw4OC41NSAyNzkuMjYsODYuMDIKICAgICAgICAgICAgIDI3Ni40OSw3OC45OCAyNjQuNjMsNzYuODggMjU4LjAwLDc2LjAwCiAgICAgICAgICAgICAyNjUuMTUsNjkuMTkgMjc2LjQwLDczLjAzIDI3NC44NSw2Mi4wNAogICAgICAgICAgICAgMjc0LjQ3LDU5LjM1IDI3My43Myw1OC44NSAyNzIuMDAsNTcuMDAKICAgICAgICAgICAgIDI4MS42OCw1My43NyAyODEuMDAsNTQuMjggMjgxLjAwLDQ0LjAwCiAgICAgICAgICAgICAyODEuMDAsNDQuMDAgMjU4LjAwLDQyLjM4IDI1OC4wMCw0Mi4zOAogICAgICAgICAgICAgMjUwLjAwLDQwLjg0IDI1MS40OCwzOC4wMyAyMzUuMDAsMzguMDAKICAgICAgICAgICAgIDIzNS4wMCwzOC4wMCAxODkuMDAsMzkuMDAgMTg5LjAwLDM5LjAwCiAgICAgICAgICAgICAxODkuMDAsMzkuMDAgMTc3LjAwLDM5LjgyIDE3Ny4wMCwzOS44MgogICAgICAgICAgICAgMTc3LjAwLDM5LjgyIDE1OS4wMCwzOC4wMCAxNTkuMDAsMzguMDAKICAgICAgICAgICAgIDE1OS4wMCwzOC4wMCAxMjguMDAsMzguMDAgMTI4LjAwLDM4LjAwCiAgICAgICAgICAgICAxMTYuOTAsMzguMDIgMTIwLjE2LDM5LjQwIDExMy4wMCw0MC42NwogICAgICAgICAgICAgMTEzLjAwLDQwLjY3IDk3LjAwLDQyLjE3IDk3LjAwLDQyLjE3CiAgICAgICAgICAgICA5Ny4wMCw0Mi4xNyA4Ny4wMCw0My44MyA4Ny4wMCw0My44MwogICAgICAgICAgICAgODcuMDAsNDMuODMgNTcuMDAsNDUuMDAgNTcuMDAsNDUuMDAKICAgICAgICAgICAgIDU3LjAwLDQ1LjAwIDMyLjAwLDQ4LjAwIDMyLjAwLDQ4LjAwCiAgICAgICAgICAgICAzMi4wMCw0OC4wMCAxMi4wMCw0OC4wMCAxMi4wMCw0OC4wMCBaIiAvPgo8L3N2Zz4K');
    // background-position: 50% 50%;
    // padding-left: 20px;
    // padding-right: 20px;
    // padding-top: 5px;
    // background-repeat: no-repeat;
    // background-size: cover;
  }
`;

const TagsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 13px;
  color: #7bb06e;
  margin-top: 15px;
  height: 30px;
  overflow-y: hidden;
`;

const TagBox = styled.span`
  display: flex;
  flex-direction: row;
  padding: 0 5px;
`;

const HistoryItem = ({ conversation, handleClick }: Props) => {
  // const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);

  const handlePinUpdate = async (newPinValue: boolean) => {
    await updatePinState({
      cId: conversation.conversationId,
      value: newPinValue,
    });
  };

  const handleDeleteConv = async () => {
    await deleteConversation(conversation.conversationId);
    console.log('delete success!');
    setShow(false);
    // initializeConversation(-1);
  };

  return (
    show && (
      <Content>
        <div className="fixed">
          <HistoryEditUI
            pinned={conversation.pinned}
            handlePinUpdate={handlePinUpdate}
            handleDeleteConv={handleDeleteConv}
          />
        </div>
        <div className="header">
          <h3
            className="title"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(conversation.conversationId);
            }}
          >
            {truncateTitle(conversation.title, 50)}
          </h3>
        </div>
        {!!conversation.tags.length && (
          <TagsBox>
            {conversation.tags.map((tag: any) => (
              <TagBox key={tag.tagId}>#{tag.tagName} </TagBox>
            ))}
          </TagsBox>
        )}
      </Content>
    )
  );
};

export default HistoryItem;
