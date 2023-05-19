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
  // updateBookmark,
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

// type BookmarkCheckType = BookmarkType & {
//   checked: boolean;
// };

const DialogBoxSaveBookmark = ({ setIsModalOpen }: Props) => {
  const dispatch = useAppDispatch();
  const cId = useAppSelector(selectCId);
  let bookmarks = useAppSelector(selectConversation).bookmarks;
  let uncheckedBookmarks = useAppSelector(selectConversation).bookmarkList;

  const [bNum, setBNum] = useState<number>(bookmarks.length);

  useEffect(() => {
    console.log('update bookmarks in dialog box');
    console.log('checked:', bookmarks);
    console.log('unchecked: ', uncheckedBookmarks);
  }, [bNum]);

  // useEffect(() => {
  //   console.log('fetching updated bookmarks!');
  //   //temp solution
  //   if (bookmarks) {
  //     const newBookmarks = bookmarks.map((b) => {
  //       return {
  //         ...b,
  //         checked: true,
  //       };
  //     });

  //     setBookmarkList(newBookmarks);
  //   }
  // }, [bookmarks]);

  //access stored data for current conversation, that was fetched from the server
  //add property checked

  // const handleModalBackdropClick = () => {
  //   if (setIsOpen) setIsOpen(false);
  // };

  // useEffect(() => {
  //   console.log('change in bookmarkList');
  // }, [bookmarkList]);

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
          await dispatch(
            addBookmarkAsync({ cId, bId: id, bName: newBookmarkName }),
          );
          setBNum((prev) => prev + 1);
        }
      } else {
        await dispatch(deleteBookmarkAsync({ cId, bId: id }));
        setBNum((prev) => prev - 1);
      }
    } catch (error) {
      // Handle the error if needed
      console.error('Error occurred:', error);
    }
  };
  // const handleBookmarkCheck = ({
  //   id,
  //   newCheckValue,
  // }: {
  //   id: number;
  //   newCheckValue: boolean;
  // }) => {
  //   //if checked
  //   if (newCheckValue) {
  //     dispatch(updateBookmark({ bId: id, type: 'ADD' }));
  //     setBNum((prev) => prev + 1);
  //   } else {
  //     dispatch(updateBookmark({ bId: id, type: 'DELETE' }));
  //     setBNum((prev) => prev - 1);
  //   }
  // };

  // const updateBNum = () => {
  //   console.log('updating bookmark numbers');
  // };
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
