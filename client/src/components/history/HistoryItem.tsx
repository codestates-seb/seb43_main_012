import React, { useState } from 'react';
import styled from 'styled-components';

import { ConversationThumbType } from '../../data/d';
import { truncateTitle } from '../../utils/ContentFunctions';
import HistoryEditUI from './HistoryEditUI';

// import { useAppDispatch } from '../../app/hooks';
// import { updatePinAsync } from '../../features/main/conversationSlice';
import { updatePinState, deleteConversation } from '../../api/ChatInterfaceApi';

type Props = {
  conversation: ConversationThumbType;
  handleClick: (cId: number) => void;
  handleTagClick: (tId: number | string) => void;
};

export const HistContent = styled.div`
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
    word-break: keep-all;

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
  }
`;

const TagsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 500;
  color: #7bb06e;
  margin-top: 15px;
  height: 30px;
  overflow-y: hidden;

  &:hover {
    cursor: pointer;
  }
`;

const TagBox = styled.span`
  display: flex;
  flex-direction: row;
  padding: 0 5px;
`;

const HistoryItem = ({ conversation, handleClick, handleTagClick }: Props) => {
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

  const handleTagBtnClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('event: ', e);
    console.log('event: ', e.target.id);
    handleTagClick(e.target.id);
  };

  return (
    <>
      {show && (
        <HistContent>
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
                <TagBox
                  key={tag.tagId}
                  id={tag.tagName}
                  onClick={handleTagBtnClick}
                >
                  #{tag.tagName}{' '}
                </TagBox>
              ))}
            </TagsBox>
          )}
        </HistContent>
      )}
    </>
  );
};

export default HistoryItem;
