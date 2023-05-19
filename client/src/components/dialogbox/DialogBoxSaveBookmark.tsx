import React, { useEffect, useState } from 'react';
//import style
import styled from 'styled-components';
import { ModalBackdrop } from '../../styles/CharacterStyle';
//import components
import BookmarkList from '../bookmarks/BookmarkList';
//import data
import { BookmarkType, DefaultBookmarks } from '../../data/d';
//import redux
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectCId,
  selectConversation,
  addBookmarkAsync,
  deleteBookmarkAsync,
} from '../../features/main/conversationSlice';
const BoxBackdrop = styled(ModalBackdrop)`
  background: transparent;
  z-index: 999;
`;
type Props = {
  setIsModalOpen: (isOpen: boolean) => void;
};

const DialogBoxSaveBookmark = ({ setIsModalOpen }: Props) => {
  const dispatch = useAppDispatch();
  let bookmarks = useAppSelector(selectConversation).bookmarks;
  let uncheckedBookmarks = useAppSelector(selectConversation).bookmarkList;

  // const handleModalBackdropClick = () => {
  //   if (setIsOpen) setIsOpen(false);
  // };

  //handle bookmark check/uncheck
  const handleBookmarkCheck = async ({
    id,
    newCheckValue,
  }: {
    id: number;
    newCheckValue: boolean;
  }) => {
    try {
      if (newCheckValue) {
        const newBookmarkName = uncheckedBookmarks.find(
          (b) => b.bookmarkId === id,
        )?.bookmarkName;
        if (newBookmarkName) {
          await dispatch(addBookmarkAsync({ bId: id, bName: newBookmarkName }));
        }
      } else {
        await dispatch(deleteBookmarkAsync({ bId: id }));
      }
    } catch (error) {
      // Handle the error if needed
      console.error('Error occurred:', error);
    }
  };

  return (
    <BookmarkList
      setIsModalOpen={setIsModalOpen}
      list={bookmarks}
      uncheckedList={uncheckedBookmarks}
      handleCheck={handleBookmarkCheck}
    />
  );
};

export default DialogBoxSaveBookmark;
