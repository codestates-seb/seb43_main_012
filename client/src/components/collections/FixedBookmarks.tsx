import React from 'react';
import styled from 'styled-components';

import FixedItem from './FixedItem';
import { Conversation } from '../../data/d';
import { getConversation } from '../../api/ChatInterfaceApi';
import { useAppDispatch } from '../../app/hooks';
import { setConversation } from '../../features/main/conversationSlice';

const FixedBox = styled.div`
  display: flex;
  max-width: 90vw;
  justify-content: flex-start;
  align-items: center;
  // align-self: flex-start;
  overflow: auto;
`;
const FixedItems = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #faf7f1;
  min-width: 300px;
  max-width: 1260px;
  min-height: 170px;
  width: 100%;
  overflow-x: scroll;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px 0;

  &::-webkit-scrollbar {
    background-color: transparent;
    height: 6px;
    border-radius: 6px;
  }

  &:hover {
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

type Props = {
  conversations: Conversation[];
  handleModalOpen: () => void;
};

const FixedBookmarks = ({ conversations, handleModalOpen }: Props) => {
  const dispatch = useAppDispatch();
  const handleContentClick = async (cId: number) => {
    await loadConv(cId);
    handleModalOpen();
  };
  const loadConv = async (cId: number) => {
    const conversation = await getConversation(cId);
    if (conversation) {
      //질문응답이 하나면 펼쳐서 보여주고, 여러개면 collapse해서 보여주기
      // if (conversation.qnaList.length <= 1) {
      //   dispatch(toggleModal(true));
      // } else {
      //   dispatch(toggleModal(false));
      // }
      dispatch(setConversation(conversation));
    }

    return;
  };

  return (
    <FixedBox>
      <FixedItems>
        {conversations
          .filter((item: any) => item.pinned)
          .map((conversation: Conversation) => (
            <FixedItem
              key={conversation.conversationId}
              conversation={conversation}
              handleContentClick={handleContentClick}
            />
          ))}
      </FixedItems>
    </FixedBox>
  );
};

export default FixedBookmarks;
