import { useEffect, useState } from 'react';
// import axios from 'axios';
import { requestAuth } from '../utils/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../app/store';
import styled from 'styled-components';
import { BookmarkType, Conversation, QnAType, TagType } from '../data/d';
import { ReactComponent as BookmarkSolid } from '../assets/icons/bookmark-solid.svg';
import { ReactComponent as ThumbtackSolid } from '../assets/icons/history/iconPinned.svg';
import ModalContent from '../components/modals/ModalContent';
import ModalHistoryItem from '../components/modals/ModalHistoryItem';

import {
  setContent,
  setSelectedBookmark,
  setSelectedTag,
  toggleModal,
} from '../features/collection/collectionSlice';

import {
  getConversation,
  updatePinState,
  deleteConversation,
} from '../api/ChatInterfaceApi';
import { setConversation } from '../features/main/conversationSlice';

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
  // align-items: center;
  // overflow: scroll;
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
  justify-content: flex-start;
  align-content: flex-start;
  padding: 5px;
  overflow: scroll;
  height: 700px;
`;

const Title = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  flex-basis: 16rem;
  padding: 5px;
  border: solid;
  border-color: #c9ad6e;
  border-radius: 10px;
  margin: 0 1% 1% 0;
  height: 200px;
  min-width: 100px;
  overflow: hidden;
  p {
    max-height: 7rem;
    text-align: left;
    word-break: break-all;
    overflow: hidden;
    /* text-overflow: ellipsis; */
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .title {
    /* word-break: break-all; */
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
  .bookmark {
    color: #c9ad6e;
  }
  .tag {
    color: #7bb06e;
  }
`;

const FixedContent = styled(Content)`
  display: flex;
  flex-direction: column;
  min-width: 230px;
  align-items: flex-start;
`;

const FixedContentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: #faf7f1;
  overflow-x: scroll;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 10.5rem;
`;

const Bookmark = styled.a`
  background-color: #f0f0f0;
  border-radius: 20px;
  margin: 0 5px 5px 0;
  padding: 5px;
`;

const BookmarkAdd = styled.button`
  flex-basis: 10rem;
  margin: 5px;
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

const BookmarkTagContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SvgButton = styled.button`
  width: 20px;
  border: none;
  margin: 20% 5% 0 5%;
  background-color: transparent;
  cursor: pointer;
`;

const BookmarkButton = () => {
  return (
    <SvgButton>
      <BookmarkSolid />
    </SvgButton>
  );
};

const PinButton = () => {
  return (
    <SvgButton>
      <ThumbtackSolid />
    </SvgButton>
  );
};

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
    return firstSentence;
  }
  return '';
}

const Collections = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [content, setContent] = useState<any>({});
  const [selectedBookmark, setSelectedBookmark] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');

  // const { content, selectedBookmark, selectedTag } = useSelector(
  //   (state: RootState) => state.collection,
  // );
  useEffect(() => {
    requestAuth.get(`/collections`).then((response) => {
      console.log('loaded collections');
      setContent(response.data);
      // dispatch(setContent(response.data));
    });
  }, []);

  const loadConv = async (cId: number) => {
    const conversation = await getConversation(cId);
    if (conversation) {
      dispatch(setConversation(conversation));
    }
    return;
  };

  const handleThumbnailClick = async (cId: number) => {
    await loadConv(cId);
    setIsOpen(!isOpen);
  };

  const handleBookmarkClick = (bookmark: string) => {
    setSelectedBookmark(bookmark);
    // dispatch(setSelectedBookmark(bookmark));
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    // dispatch(setSelectedTag(tag));
  };

  const handleContentUpdate = (newContent: any) => {
    // dispatch(setContent(newContent));
    setContent(newContent);
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

  // const handlePinUpdate = async (newPinValue: boolean, cId: number) => {
  //   await updatePinState({
  //     cId: conversation.conversationId,
  //     value: newPinValue,
  //   });
  // };

  // const handleDeleteConv = async (cId) => {
  //   await deleteConversation(conversation.conversationId);
  //   console.log('delete success!');
  //   setShow(false);
  //   // initializeConversation(-1);
  // };

  return (
    content?.conversations && (
      <Main>
        {selectedConversation && (
          <ModalContent
            conversation={selectedConversation}
            onClose={handleCloseModal}
          />
        )}
        <FixedContentContainer>
          {content.conversations
            .filter((item: any) => item.pinned)
            .map((conversation: Conversation) => (
              <FixedContent>
                <div className="header">
                  <Title
                    className="title"
                    key={conversation.conversationId}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleThumbnailClick(conversation.conversationId);
                    }}
                    // onClick={() => handleContentClick(conversation)}
                  >
                    {conversation.title}
                  </Title>
                  <span className="buttons">
                    <PinButton />
                  </span>
                </div>
                <p>{getFirstSentence(conversation.answerSummary)}</p>
                <span className="bookmark">
                  {conversation.bookmarks[0]?.bookmarkName}
                </span>

                <div className="tag">
                  {conversation.tags.map((tag: TagType) => (
                    <span key={tag.tagId}>#{tag.tagName} </span>
                  ))}
                </div>
              </FixedContent>
            ))}
        </FixedContentContainer>

        <BookmarkTagContent>
          <div>
            <BookmarkContainer>
              <Bookmark
                href="#"
                key={'All'}
                onClick={() => handleBookmarkClick('All')}
              >
                All
              </Bookmark>
              {content.bookmarks.map((bookmark: BookmarkType) => (
                <Bookmark
                  href="#"
                  key={bookmark.bookmarkName}
                  onClick={() => handleBookmarkClick(bookmark.bookmarkName)}
                >
                  {bookmark.bookmarkName}
                </Bookmark>
              ))}
            </BookmarkContainer>
            <BookmarkAdd>+New Collection</BookmarkAdd>
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
          </div>
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
                        // onClick={() => handleContentClick(conversation)}
                      >
                        {conversation.title}
                      </Title>
                      <span className="buttons">
                        {/* <PinButton /> <BookmarkButton /> */}
                      </span>
                    </div>
                    <p>{conversation.answerSummary}</p>
                    <div className="bookmark">
                      {conversation.bookmarks.map((bookmark) => (
                        <span key={bookmark.bookmarkId}>
                          {bookmark.bookmarkName}
                          {' || '}
                        </span>
                      ))}
                    </div>
                    <div className="tag">
                      {conversation.tags.map((tag: TagType) => (
                        <span key={tag.tagId}>#{tag.tagName} </span>
                      ))}
                    </div>
                  </Content>
                ))}
              {!content.conversations.length && (
                <EmptyContainer>
                  저장된 내역이 없습니다. 새대화, 이전대화에 북마크를
                  달아보세요!
                </EmptyContainer>
              )}
            </ContentContainer>
          </ContentWraper>
        </BookmarkTagContent>
        {isOpen && <ModalHistoryItem visible={isOpen} setVisible={setIsOpen} />}
      </Main>
    )
  );
};

export default Collections;
