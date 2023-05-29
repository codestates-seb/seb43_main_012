import React from 'react';
import styled from 'styled-components';

import FixedItem from './FixedItem';
import { Conversation } from '../../data/d';

const FixedContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #faf7f1;
  overflow-x: scroll;
  margin-top: 30px;
  margin-bottom: 30px;
`;

type Props = {
  conversations: Conversation[];
  handleContentClick: (cId: number) => void;
};

const FixedBookmarks = ({ conversations, handleContentClick }: Props) => {
  return (
    <FixedContentContainer>
      {conversations
        .filter((item: any) => item.pinned)
        .map((conversation: Conversation) => (
          <FixedItem
            key={conversation.conversationId}
            conversation={conversation}
            handleContentClick={handleContentClick}
          />
        ))}
    </FixedContentContainer>
  );
};

export default FixedBookmarks;
