import React, { useEffect, useState } from 'react';
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
  BookmarkTempType,
} from '../../data/dataTypes';
//import api
import { editBookmark } from '../../api/ChatInterfaceApi';
const BoxBackdrop = styled(ModalBackdrop)`
  background: transparent;
  z-index: 999;
`;
type Props = {
  cId: number;
  bookmarks: BookmarkType[];
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type BookmarkCheckType = BookmarkType & {
  checked: boolean;
};

const DialogBoxSaveBookmark = ({ cId, bookmarks, setIsOpen }: Props) => {
  useEffect(() => {
    console.log('fetched bookmarks!');
    //temp solution
    if (bookmarks) {
      const newBookmarks = bookmarks.map((b) => {
        return {
          ...b,
          // bookmarkId: b.categoryId,
          // bookmarkName: b.categoryName,
          checked: true,
        };
      });

      setBookmarkList(newBookmarks);
    }
  }, [bookmarks]);

  //access stored data for current conversation, that was fetched from the server
  //add property checked
  const newTemp = DefaultBookmarks.map((b) => {
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
    const bookmarkToUpdate = bookmarkList.find(
      (item) => item.bookmarkId === id,
    );

    if (index !== -1 && bookmarkToUpdate) {
      const updatedBookmarks = bookmarkList.map((b) => {
        if (b.bookmarkId === index) b.checked = newCheckValue;
        return b;
      });
      const updatedBookmarkNames = updatedBookmarks
        .filter((b) => b.checked)
        .map((b) => b.bookmarkName);
      //update conversation on server
      editBookmark({
        cId,
        bookmarks: updatedBookmarkNames,
      });

      //update conversation within app
      // setBookmarkList((prevList) => {
      //   const newList = [...prevList];
      //   newList[index] = { ...newList[index], checked: newCheckValue };
      //   return newList;
      // });
    }
  };

  return <BookmarkList list={bookmarkList} handleCheck={handleBookmarkCheck} />;
};

export default DialogBoxSaveBookmark;
