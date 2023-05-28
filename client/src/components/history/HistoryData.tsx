import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TimeLine, TimeBox } from '../../styles/HistoryStyle';

import HistoryItem from './HistoryItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getConversation,
  getTaggedConversations,
} from '../../api/ChatInterfaceApi';
import {
  setConversation,
  initializeConversation,
  selectConversation,
} from '../../features/main/conversationSlice';
import { toggleModal } from '../../features/collection/collectionSlice';

import { BinnedConvType } from '../../pages/History';
import { TagType, ConversationThumbType } from '../../data/d';
const Main = styled.main`
  min-width: 270px;
  max-width: 1080px;
  padding: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
align-content; flex-start;
  border: none;
  width: 100%;
  height: 100%;
`;

const ContentContainer = styled.div`
  border: none;
  display: flex;
  flex-direction: row;
  padding: 0 0 20px 0;
  overflow-x: scroll;
  height: 100%;
  width: 100%;
  min-width: 300px;
`;

type HistoryProps = {
  binnedConv: BinnedConvType;
  handleClick: () => void;
  TagSearch: (parameter: number | string) => void;
};

const HistoryData = ({ binnedConv, handleClick, TagSearch }: HistoryProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleThumbnailClick = async (cId: number) => {
    console.log('thumbnail click!');
    // setIsLoading(true);
    await loadConv(cId);
    console.log('loaded conv');
    handleClick();
  };

  const handleTagClick = async (tId: number | string) => {
    await TagSearch(tId);
  };

  const loadConv = async (cId: number) => {
    const conversation = await getConversation(cId);
    if (conversation) {
      dispatch(setConversation(conversation));
      //질문응답이 하나면 펼쳐서 보여주고, 여러개면 collapse해서 보여주기
      if (conversation.qnaList.length <= 1) {
        dispatch(toggleModal(true));
      } else {
        dispatch(toggleModal(false));
      }
    }
    return;
  };

  return (
    <>
      {Object.keys(binnedConv).map((key) => {
        const conversations = binnedConv[key];
        if (!conversations.length) return;

        return (
          <React.Fragment key={key}>
            <TimeLine>{key.toUpperCase()}</TimeLine>
            <TimeBox>
              <Main>
                <ContentWrapper>
                  <ContentContainer id={`history-bin-${key}`}>
                    {conversations.map((conversation) => (
                      <HistoryItem
                        key={conversation.conversationId}
                        conversation={conversation}
                        handleClick={handleThumbnailClick}
                        handleTagClick={handleTagClick}
                      />
                    ))}
                  </ContentContainer>
                </ContentWrapper>
              </Main>
            </TimeBox>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default HistoryData;
