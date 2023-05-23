import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { getAllConversations } from '../../api/ChatInterfaceApi';
import styled from 'styled-components';
import { TimeLine, TimeBox } from '../../styles/HistoryStyle';

import { DateFilter, filterConvsByDate } from '../../utils/DateFiltering';
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

import { TagType, ConversationThumbType } from '../../data/d';
import HistoryItem from './HistoryItem';
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
`;

export type BinnedConvType = {
  [key in DateFilter]: ConversationThumbType[];
};

type HistoryProps = {
  handleClick: () => void;
};

const HistoryData = ({ handleClick }: HistoryProps) => {
  const [binnedConv, setBinnedConv] = useState<BinnedConvType>({});
  const dispatch = useAppDispatch();
  const conv = useAppSelector(selectConversation);
  // 데이터 GET
  useEffect(() => {
    loadAllConv();
  }, []);

  useEffect(() => {
    console.log('update history data');
    loadAllConv();
  }, [conv]);

  const handleThumbnailClick = async (cId: number) => {
    console.log('thumbnail clicked!, ', cId);
    await loadConv(cId);
    handleClick();
  };

  const handleTagClick = async (tId: number | string) => {
    console.log('tag clicked!');
    await TagSearch(tId);
    console.log('tag loading success');
  };

  const loadAllConv = async () => {
    try {
      const conversations: ConversationThumbType[] =
        await getAllConversations();
      console.log(filterConvsByDate(conversations));
      conversations.sort((a, b) => (b.pinned ? 1 : a.pinned ? -1 : 0));
      setBinnedConv(filterConvsByDate(conversations));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const loadConv = async (cId: number) => {
    const conversation = await getConversation(cId);
    if (conversation) {
      dispatch(setConversation(conversation));
    }
    return;
  };

  const TagSearch = async (tagId: number | string) => {
    try {
      const res = await getTaggedConversations(tagId);
      if (res) {
        console.log('loading tagged results!');
        res.sort((a: ConversationThumbType, b: ConversationThumbType) =>
          b.pinned ? 1 : a.pinned ? -1 : 0,
        );
        setBinnedConv(filterConvsByDate(res));
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
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
