import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { getAllConversations } from '../../api/ChatInterfaceApi';
import styled from 'styled-components';
import { TimeLine, TimeBox } from '../../styles/HistoryStyle';

import { DateFilter, filterConvsByDate } from '../../utils/DateFiltering';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getConversation } from '../../api/ChatInterfaceApi';
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

export type BinnedConvType = {
  [key in DateFilter]: ConversationThumbType[];
};

type HistoryProps = {
  handleClick: () => void;
};

// ...rest of your code remains same...

const HistoryData = ({ handleClick }: HistoryProps) => {
  const [binnedConv, setBinnedConv] = useState<BinnedConvType>({});
  const dispatch = useAppDispatch();
  const conv = useAppSelector(selectConversation);
  // 데이터 GET
  useEffect(() => {
    (async function () {
      try {
        const conversations = await getAllConversations();
        console.log(filterConvsByDate(conversations));
        setBinnedConv(filterConvsByDate(conversations));
      } catch (err) {
        console.log(err);
        throw err;
      }
    })();
  }, []);

  useEffect(() => {
    console.log('update history data');
    (async function () {
      try {
        const conversations = await getAllConversations();
        console.log(filterConvsByDate(conversations));
        setBinnedConv(filterConvsByDate(conversations));
      } catch (err) {
        console.log(err);
        throw err;
      }
    })();
  }, [conv]);

  const loadConv = async (cId: number) => {
    const conversation = await getConversation(cId);
    if (conversation) {
      dispatch(setConversation(conversation));
    }
    return;
  };
  const handleThumbnailClick = async (cId: number) => {
    console.log('thumbnail clicked!, ', cId);
    await loadConv(cId);
    handleClick();
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
                  <HistoryItem
                    uniqueId={key}
                    conversations={conversations}
                    handleClick={handleThumbnailClick}
                  />
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
