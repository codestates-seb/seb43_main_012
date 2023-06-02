import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

//import styles
import { DeleteButton } from '../../styles/HistoryStyle';

//import components
import BookmarkSidebarItem from './BookmarkSidebarItem';
import ModalCreateBookmark from '../modals/ModalCreateBookmark';

//import data
import { BookmarkType } from '../../data/d';

//import api
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectedCollectionBookmark } from '../../features/collection/collectionSlice';
import { setCollectionBookmark } from '../../features/collection/collectionSlice';

const SidebarBox = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 11rem;
  max-height: 30vh;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  overflow-x: hidden;
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
`;

const BookmarkAddBtn = styled(DeleteButton)`
  margin-top: 20px;
  padding: 10px 25px;
  border: 1.5px solid var(--color-default-darkgreen);
  background-color: var(--color-default-green-10);
  color: var(--color-default-darkgreen);

  &:hover {
    background-color: var(--color-default-green-70);
  }
`;

type Props = {
  bookmarks: BookmarkType[];
  handleClick: ({
    bookmarkId,
    bookmarkName,
  }: {
    bookmarkId: number;
    bookmarkName: string;
  }) => void;
};

const BookmarkSidebar = ({ bookmarks, handleClick }: Props) => {
  const dispatch = useAppDispatch();
  const selectedBookmark = useAppSelector(selectedCollectionBookmark);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setSelectedBookmark = (bName: string) => {
    dispatch(setCollectionBookmark(bName));
  };

  useEffect(() => {
    // console.log('bookmark reloaded');
    // console.log('selected bookmark: ', selectedBookmark);
  }, [bookmarks]);

  const handleCreateBtnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <SidebarBox>
      <BookmarkContainer>
        {selectedBookmark === 'All' ? (
          <BookmarkSidebarItem
            selected={true}
            bookmark={{ bookmarkId: 0, bookmarkName: 'All' }}
            setBookmark={setSelectedBookmark}
            handleClick={handleClick}
          />
        ) : (
          <BookmarkSidebarItem
            selected={false}
            bookmark={{ bookmarkId: 0, bookmarkName: 'All' }}
            setBookmark={setSelectedBookmark}
            handleClick={handleClick}
          />
        )}
        {bookmarks.map((bookmark: BookmarkType) =>
          bookmark.bookmarkName === selectedBookmark ? (
            <BookmarkSidebarItem
              key={bookmark.bookmarkId}
              selected={true}
              bookmark={bookmark}
              setBookmark={setSelectedBookmark}
              handleClick={handleClick}
            />
          ) : (
            <BookmarkSidebarItem
              key={bookmark.bookmarkId}
              selected={false}
              bookmark={bookmark}
              setBookmark={setSelectedBookmark}
              handleClick={handleClick}
            />
          ),
        )}
      </BookmarkContainer>{' '}
      <BookmarkAddBtn onClick={handleCreateBtnClick}>+ New List</BookmarkAddBtn>
      {isModalOpen && (
        <ModalCreateBookmark
          visible={isModalOpen}
          setVisible={setIsModalOpen}
          mode="addEmpty"
        />
      )}
    </SidebarBox>
  );
};

export default BookmarkSidebar;
