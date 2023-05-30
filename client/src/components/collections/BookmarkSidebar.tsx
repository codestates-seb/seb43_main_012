import React, { useState } from 'react';
import styled from 'styled-components';

//import styles
import { DeleteButton } from '../../styles/HistoryStyle';

//import components
import BookmarkSidebarItem from './BookmarkSidebarItem';
import ModalCreateBookmark from '../modals/ModalCreateBookmark';

//import data
import { BookmarkType } from '../../data/d';

//import api
import { useAppSelector } from '../../app/hooks';
import { selectedCollectionBookmark } from '../../features/collection/collectionSlice';

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
  align-items: center;
  justify-content: flex-start;
`;

const BookmarkAddBtn = styled(DeleteButton)`
  margin-top: 10px;
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
  const [selectedBookmark, setSelectedBookmark] = useState(
    useAppSelector(selectedCollectionBookmark),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBtnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
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
      <BookmarkAddBtn onClick={handleCreateBtnClick}>+ New List</BookmarkAddBtn>
      {isModalOpen && (
        <ModalCreateBookmark
          visible={isModalOpen}
          setVisible={setIsModalOpen}
          mode="addEmpty"
        />
      )}
    </BookmarkContainer>
  );
};

export default BookmarkSidebar;
