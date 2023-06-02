import React from 'react';
import styled from 'styled-components';

import { truncateTitle } from '../../utils/ContentFunctions';

import { Conversation, TagType } from '../../data/d';

import { useAppDispatch } from '../../app/hooks';
import { getConversation } from '../../api/ChatInterfaceApi';
import { setConversation } from '../../features/main/conversationSlice';
import { toggleModal } from '../../features/collection/collectionSlice';

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px;
  margin-left: 50px;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 20vh;
  width: 100%;
  max-width: 1080px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  // width: 100%;

  max-width: 1050px;
  width: fit-content;
  overflow-y: scroll;
  max-height: 60vh;

  padding: 0 0 40px;
  margin-left: 20px;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
    border-radius: 6px;
  }

  &:hover {
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  line-height: 1.5rem;
  font-weight: 500;
  font-stretch: condensed;
  &:hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 15.5rem;
  padding: 5px;
  border 1px solid #8dad84;
  border-radius: 10px;
  margin: 0 .6% 1.2%;
  padding: 0 10px;
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
    // background:  url(//s2.svgbox.net/pen-brushes.svg?ic=brush-1&color=DFFAD6);
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

function getFirstSentence(paragraph: string): string {
  const punctuationRegex = /[.!?]/;
  const matches = paragraph.match(punctuationRegex);
  if (matches && matches.length > 0) {
    const firstPunctuationIndex = paragraph.indexOf(matches[0]);
    const firstSentence = paragraph.slice(0, firstPunctuationIndex + 1).trim();
    if (
      firstSentence.length < truncateTitle(paragraph, 30).length ||
      firstSentence.length > 50
    ) {
      return truncateTitle(paragraph, 45);
    } else {
      return firstSentence;
    }
  }
  return '';
}

type Props = {
  conversations: Conversation[];
  selectedBookmark: string;
  handleModalOpen: () => void;
};

const CollectionItemList = ({
  conversations,
  selectedBookmark,
  handleModalOpen,
}: Props) => {
  const dispatch = useAppDispatch();
  const handleThumbnailClick = async (cId: number) => {
    await loadConv(cId);
    handleModalOpen();
  };

  const loadConv = async (cId: number) => {
    const conversation = await getConversation(cId);
    if (conversation) {
      //질문응답이 하나면 펼쳐서 보여주고, 여러개면 collapse해서 보여주기
      if (conversation.qnaList.length <= 1) {
        dispatch(toggleModal(true));
      } else {
        dispatch(toggleModal(false));
      }
      dispatch(setConversation(conversation));
    }

    return;
  };

  return (
    <ContentBox>
      <ContentContainer>
        {conversations
          .filter(
            (conversation: Conversation) =>
              selectedBookmark === 'All' ||
              conversation.bookmarks
                .map((b) => b.bookmarkName)
                .includes(selectedBookmark),
          )
          .map((conversation: Conversation) => (
            <Content key={conversation.conversationId}>
              <div className="header">
                <Title
                  className="title"
                  key={conversation.conversationId}
                  onClick={() => {
                    handleThumbnailClick(conversation.conversationId);
                  }}
                >
                  {truncateTitle(conversation.title, 35)}
                </Title>
              </div>
              <div
                className="content"
                onClick={() => {
                  handleThumbnailClick(conversation.conversationId);
                }}
              >
                {getFirstSentence(conversation.answerSummary)}
              </div>
              <div className="links">
                <div className="bookmark">
                  {conversation.bookmarks.map((bookmark) => (
                    <span key={bookmark.bookmarkId}>
                      {bookmark.bookmarkName}
                    </span>
                  ))}
                </div>
                <div className="tag">
                  {conversation.tags.map((tag: TagType) => (
                    <span key={tag.tagId}>#{tag.tagName} </span>
                  ))}
                </div>
              </div>
            </Content>
          ))}
        {!conversations.length && (
          <EmptyContainer>
            저장된 내역이 없습니다. 새대화, 이전대화에 북마크를 달아보세요!
          </EmptyContainer>
        )}
      </ContentContainer>
    </ContentBox>
  );
};

export default CollectionItemList;
