import React, { useState } from 'react';
import styled from 'styled-components';

import BookmarkSidebarItem from './BookmarkSidebarItem';

import { BookmarkType } from '../../data/d';

import { useAppSelector } from '../../app/hooks';
import { selectedCollectionBookmark } from '../../features/collection/collectionSlice';

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 12rem;
  align-items: center;
  justify-content: flex-start;
`;

const BookmarkAdd = styled.button`
  display: flex;
  justify-content: center;
  // width: 100%;
  margin: 5px;
  padding: 5px;

  &:hover {
    cursor: pointer;
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
      <BookmarkAdd>+ New List</BookmarkAdd>
    </BookmarkContainer>
  );
};

export default BookmarkSidebar;
