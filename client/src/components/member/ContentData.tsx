import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setContent,
  setSelectedBookmark,
  setSelectedTag,
} from '../../features/collection/collectionSlice';
import { RootState } from '../../app/store';
import styled from 'styled-components';
import {
  BookmarkType,
  Conversation,
  QnAType,
  TagType,
} from '../../data/dataTypes';
import { ReactComponent as BookmarkSolid } from '../../assets/icons/bookmark-solid.svg';
import { ReactComponent as ThumbtackSolid } from '../assets/icons/thumbtack-solid.svg';
import ModalContent from '../../components/modals/ModalContent';
import exp from 'constants';

//styled
const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 5px;
`;

const Content = styled.div``;

// content의 타입
type Content = {
  conversations: Conversation[];
  tags: TagType[];
  bookmarks: BookmarkType[];
};

const UseData = () => {
  const dispatch = useDispatch();
  const { content, selectedBookmark, selectedTag } = useSelector(
    (state: RootState) => state.collection,
  );
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const currentDate = new Date();
  const today = currentDate.toISOString().slice(0, 10);

  useEffect(() => {
    axios
      .get(
        'http://ec2-3-35-18-213.ap-northeast-2.compute.amazonaws.com:8080/collections/',
      )
      .then((response) => {
        dispatch(setContent(response.data));
        console.log(response.data);
      });
  }, [dispatch]);

  return (
    <ContentContainer>
      {content.conversations
        .filter((conversation) => {
          const conversationDate = new Date(conversation.modifiedAt);
          const conversationDateString = conversationDate
            .toISOString()
            .slice(0, 10);
          return conversationDateString === today;
        })
        .map((conversation) => (
          <Content key={conversation.conversationId}>
            <div className="header">
              <h3 className="title">{conversation.title}</h3>
            </div>
            <p>{conversation.answerSummary}</p>
            <div className="tag">
              {conversation.tags.map((tag: TagType) => (
                <span key={tag.tagId}>#{tag.tagName} </span>
              ))}
            </div>
          </Content>
        ))}
    </ContentContainer>
  );
};

export default UseData;