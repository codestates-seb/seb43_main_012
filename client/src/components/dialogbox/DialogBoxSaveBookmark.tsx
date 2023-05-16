import React, { useState } from 'react';
//import style
import styled from 'styled-components';
import { ModalBackdrop } from '../../styles/CharacterStyle';
//import components
import BookmarkList from '../bookmarks/BookmarkList';
//import data
import {
  BookmarkType,
  tempBookmarks,
  DefaultBookmarks,
} from '../../data/dataTypes';

const BoxBackdrop = styled(ModalBackdrop)`
  background: transparent;
  z-index: 999;
`;
type Props = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type BookmarkCheckType = BookmarkType & {
  checked: boolean;
};

const DialogBoxSaveBookmark = ({ setIsOpen }: Props) => {
  //access stored data for current conversation, that was fetched from the server
  //add property checked
  const newTemp = tempBookmarks.map((b) => {
    return { ...b, checked: false };
  });

  const [bookmarkList, setBookmarkList] =
    useState<BookmarkCheckType[]>(newTemp);

  const handleModalBackdropClick = () => {
    if (setIsOpen) setIsOpen(false);
  };

  //handle bookmark check/uncheck
  const handleBookmarkCheck = ({
    id,
    newCheckValue,
  }: {
    id: number;
    newCheckValue: boolean;
  }) => {
    const index = bookmarkList.findIndex((item) => item.bookmarkId === id);
    if (index !== -1) {
      setBookmarkList((prevList) => {
        const newList = [...prevList];
        newList[index] = { ...newList[index], checked: newCheckValue };
        return newList;
      });
    }
  };

  return <BookmarkList list={bookmarkList} handleCheck={handleBookmarkCheck} />;
};

export default DialogBoxSaveBookmark;
