import React from 'react';
import styled from 'styled-components';

import { BookmarkType } from '../../data/d';

const Bookmark = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 20px;
  margin: 0 5px 5px 0;
  padding: 5px;
  width: 100%;
  height: 2.2rem;

  span {
    padding: 0 5px;
  }

  span.name {
    width: 100%;
    flex-basis: 3;
    // width: 80%:
  }

  span.dots {
    flex-basis: 1;
    color: gray;

    &:hover {
      color: black;
      font-size: 1.1rem;
    }
  }

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;

const SelectedBookmark = styled(Bookmark)`
  background-color: var(--color-default-green-70);
  color: white;

  &:hover {
    background-color: var(--color-default-green);

    span.dots {
      color: lightgray;
    }
  }

  span.dots:hover {
    color: white;
  }

  &:active {
    background-color: var(--color-default-darkgreen);
  }
`;

type Props = {
  bookmark: BookmarkType;
  selected: boolean;
  setBookmark: React.Dispatch<React.SetStateAction<string>>;
  handleClick: ({
    bookmarkId,
    bookmarkName,
  }: {
    bookmarkId: number;
    bookmarkName: string;
  }) => void;
};

const BookmarkSidebarItem = ({
  bookmark,
  selected,
  setBookmark,
  handleClick,
}: Props) => {
  return selected ? (
    <SelectedBookmark
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setBookmark(bookmark.bookmarkName);
        handleClick(bookmark);
      }}
    >
      <span className="name">{bookmark.bookmarkName}</span>
      <span className="dots">···</span>
    </SelectedBookmark>
  ) : (
    <Bookmark
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setBookmark(bookmark.bookmarkName);
        handleClick(bookmark);
      }}
    >
      <span className="name">{bookmark.bookmarkName}</span>
      <span className="dots">···</span>
    </Bookmark>
  );
};

export default BookmarkSidebarItem;
