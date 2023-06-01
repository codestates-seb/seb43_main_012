import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ModalContent from '../components/modals/ModalContent';
import FixedBookmarks from '../components/collections/FixedBookmarks';
import BookmarkSidebar from '../components/collections/BookmarkSidebar';
import CollectionItemList from '../components/collections/CollectionItemList';
import ModalHistoryItem from '../components/modals/ModalHistoryItem';

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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  max-height: 90vh;
  overflow: hidden;
`;

const Footer = styled.footer`
  padding: 15px 0;
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
  justify-content: center;
  height: 100%;
  width: 90vw;
  overflow: hidden;
  margin-left: 10px;
`;

const SvgButton = styled.button`
  width: 20px;
  border: none;
  margin: 0%;
  background-color: transparent;
  cursor: pointer;
`;
const BottomMargin = styled.div`
  display: flex;

  padding: 20px 0;
`;

type Content = {
  conversations: Conversation[];
  tags: TagType[];
  bookmarks: BookmarkType[];
};

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
    console.log('reload collections');
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
    // setIsLoading(true);
    const collection = await getCollection();
    if (collection) {
      // console.log('loaded collection');
      dispatch(setCollectionContent(collection));
      const bookmarkNameList = collection.bookmarks.map(
        (b: BookmarkType) => b.bookmarkName,
      );
      setBookmarkNames(bookmarkNameList);
      // setIsLoading(false);
    }
    return;
  };

  const handleBookmarkClick = (bookmark: BookmarkType) => {
    console.log('bId:', bookmark.bookmarkId);
    dispatch(setCollectionBookmark(bookmark.bookmarkName));
  };

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleTagClick = (tag: string) => {
    dispatch(setCollectionTag(tag));
  };

  const handleContentUpdate = (newContent: any) => {
    dispatch(setCollectionContent(newContent));
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
        handleModalOpen={handleModalOpen}
      />

      <FilteringContent>
        <BookmarkSidebar
          handleClick={handleBookmarkClick}
          bookmarks={content.bookmarks}
        />
        <CollectionItemList
          conversations={content.conversations}
          selectedBookmark={selectedBookmark}
          handleModalOpen={handleModalOpen}
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
      </FilteringContent>
      <BottomMargin />

      {isOpen && <ModalHistoryItem visible={isOpen} setVisible={setIsOpen} />}
    </Main>
  ) : (
    <Loading />
  );
};

export default Collections;
