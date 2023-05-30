import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ModalContent from '../components/modals/ModalContent';
import ModalHistoryItem from '../components/modals/ModalHistoryItem';
import FixedBookmarks from '../components/collections/FixedBookmarks';
import BookmarkSidebar from '../components/collections/BookmarkSidebar';
import Loading from '../components/chatinterface/Loading';
import { truncateTitle } from '../utils/ContentFunctions';

import {
  selectCollectionContent,
  selectedCollectionBookmark,
  selectedCollectionTag,
  setCollectionContent,
  setCollectionBookmark,
  setCollectionTag,
  toggleModal,
} from '../features/collection/collectionSlice';

import {
  getConversation,
  updatePinState,
  deleteConversation,
  getCollection,
} from '../api/ChatInterfaceApi';
import {
  selectConversation,
  setConversation,
} from '../features/main/conversationSlice';
import { requestAuth } from '../utils/axiosConfig';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { BookmarkType, Conversation, QnAType, TagType } from '../data/d';

const Main = styled.main`
  width: 1080px;
  padding: 0 40px 0 40px;
`;

const ContentWraper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px;
  margin-left: 50px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 20px;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 5px;
  overflow: scroll;
  height: 700px;
  padding-bottom: 20px;
  width: 100%;
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

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 10.5rem;
  margin: 10px 0 0 0;
`;

const Tag = styled.div`
  background-color: #f0f0f0;
  border-radius: 20px;
  margin: 0 5px 5px 0;
  padding: 5px;
`;

const FilteringContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SvgButton = styled.button`
  width: 20px;
  border: none;
  margin: 0%;
  background-color: transparent;
  cursor: pointer;
`;

const ConvContent = styled.div``;

type Content = {
  conversations: Conversation[];
  tags: TagType[];
  bookmarks: BookmarkType[];
};

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

const Collections = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const content = useAppSelector(selectCollectionContent);
  const [bookmarkNames, setBookmarkNames] = useState<string[]>([]);
  const selectedBookmark = useAppSelector(selectedCollectionBookmark);
  const selectedTag = useAppSelector(selectedCollectionTag);
  const currentConv = useAppSelector(selectConversation);

  useEffect(() => {
    (async function () {
      await loadCollection();
    })();
  }, []);

  useEffect(() => {
    // console.log('load again');
    (async function () {
      await loadCollection();
    })();
  }, [currentConv]);

  useEffect(() => {
    if (!bookmarkNames.includes(selectedBookmark)) {
      // console.log('new bookmark');
      (async function () {
        await loadCollection();
      })();
    }
  }, [selectedBookmark]);

  const loadCollection = async () => {
    setIsLoading(true);
    const collection = await getCollection();
    if (collection) {
      setIsLoading(false);
      // console.log('loaded collection');
      dispatch(setCollectionContent(collection));
      const bookmarkNameList = collection.bookmarks.map(
        (b: BookmarkType) => b.bookmarkName,
      );
      setBookmarkNames(bookmarkNameList);
    }
    return;
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

  const handleThumbnailClick = async (cId: number) => {
    await loadConv(cId);
    setIsOpen(!isOpen);
  };

  const handleBookmarkClick = (bookmark: BookmarkType) => {
    console.log('bId:', bookmark.bookmarkId);
    dispatch(setCollectionBookmark(bookmark.bookmarkName));
  };

  const handleTagClick = (tag: string) => {
    dispatch(setCollectionTag(tag));
  };

  const handleContentUpdate = (newContent: any) => {
    dispatch(setCollectionContent(newContent));
  };

  const handleContentClick = (conversation: Conversation) => {
    requestAuth
      .get(`/conversations/${conversation.conversationId}`)
      .then((response) => {
        setSelectedConversation(response.data);
      });
  };
  const handleCloseModal = () => {
    setSelectedConversation(null);
  };

  return content?.conversations && !isLoading ? (
    <Main>
      {selectedConversation && (
        <ModalContent
          conversation={selectedConversation}
          onClose={handleCloseModal}
        />
      )}
      <FixedBookmarks
        conversations={content.conversations}
        handleContentClick={handleThumbnailClick}
      />

      <FilteringContent>
        <BookmarkSidebar
          handleClick={handleBookmarkClick}
          bookmarks={content.bookmarks}
        />
        {/* <TagContainer>
              {content.tags.map((tag: TagType) => (
                <Tag
                  key={tag.tagId}
                  onClick={() => handleTagClick(tag.tagName)}
                >
                  {tag.tagName}
                </Tag>
              ))}
            </TagContainer> */}
        <ContentWraper>
          <ContentContainer>
            {content.conversations
              .filter(
                (conversation: Conversation) =>
                  selectedBookmark === 'All' ||
                  conversation.bookmarks
                    .map((b) => b.bookmarkName)
                    .includes(selectedBookmark),
              )
              .map((conversation: Conversation) => (
                <Content>
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
            {!content.conversations.length && (
              <EmptyContainer>
                저장된 내역이 없습니다. 새대화, 이전대화에 북마크를 달아보세요!
              </EmptyContainer>
            )}
          </ContentContainer>
        </ContentWraper>
      </FilteringContent>
      {isOpen && <ModalHistoryItem visible={isOpen} setVisible={setIsOpen} />}
    </Main>
  ) : (
    <Loading />
  );
};

export default Collections;
