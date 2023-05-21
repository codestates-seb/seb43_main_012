import React, { useState, useEffect } from 'react';

//import style
import styled from 'styled-components';
import { BookmarkCheckbox, Bookmark, BookmarkItem } from './BookmarkItem';
import {
  DialogItems,
  SignOutFooter,
  SignoutItem,
} from '../../styles/TopNavStyle';

//import components
import GenericCheckbox from '../generic/GenericCheckbox';

//import data
import { BookmarkType } from '../../data/d';

//import redux / api
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectConversation } from '../../features/main/conversationSlice';
import { updatePinAsync } from '../../features/main/conversationSlice';

type ListProp = {
  // isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  list: BookmarkType[];
  uncheckedList: BookmarkType[];
  handleCheck: ({
    id,
    newCheckValue,
  }: {
    id: number;
    newCheckValue: boolean;
  }) => void;
};

const BookmarkItems = styled(DialogItems)`
  padding: 15px 10px;
  max-height: 200px;
  font-size: 16px;
  padding-right: 20px;
  font-size: 15px;
`;

const Footer = styled(SignOutFooter)`
  z-index: 20;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  // min-width: 600px;
`;

const Options = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Option = styled(Bookmark)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  // width: 100px;
`;

const AddBookmark = styled(SignoutItem)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-weight: var(--text-fontweight-medium);
  text-align: center;
  color: var(--color-default-green);

  &:hover {
    color: black;
  }
`;

const BookmarkList = ({
  list,
  uncheckedList,
  handleCheck,
  setIsModalOpen,
}: ListProp) => {
  const dispatch = useAppDispatch();
  const pinned = useAppSelector(selectConversation).pinned;
  const handleModalOpen = () => {
    // console.log('save bookmark modal open!');
    setIsModalOpen(true);
  };

  const handlePinCheck = async ({
    id,
    newCheckValue,
  }: {
    id?: number;
    newCheckValue: boolean;
  }) => {
    await dispatch(updatePinAsync({ value: newCheckValue }));
    console.log('updated pin');
  };

  useEffect(() => {
    // console.log('bookmarkList loaded');
  }, [list, uncheckedList]);

  return (
    <>
      <BookmarkItems>
        {Boolean(list.length) &&
          list.map((bookmark: BookmarkType) => (
            <BookmarkItem
              key={bookmark.bookmarkId}
              bookmark={bookmark}
              checkStatus={true}
              handleCheck={handleCheck}
            />
          ))}
        {Boolean(uncheckedList.length) &&
          uncheckedList.map((bookmark: BookmarkType) => (
            <BookmarkItem
              key={bookmark.bookmarkId}
              bookmark={bookmark}
              checkStatus={false}
              handleCheck={handleCheck}
            />
          ))}
      </BookmarkItems>

      <Footer>
        {Boolean(list.length) && (
          <Options>
            <Option>
              <BookmarkCheckbox>
                <GenericCheckbox
                  size="small"
                  handleCheck={handlePinCheck}
                  checked={pinned}
                />
              </BookmarkCheckbox>
              <div>Pin</div>
            </Option>
            <Option>
              <BookmarkCheckbox>
                <GenericCheckbox size="small" disabled={true} />
              </BookmarkCheckbox>
              <div>Publish</div>
            </Option>
          </Options>
        )}
        <AddBookmark onClick={handleModalOpen}>Create New List</AddBookmark>
      </Footer>
    </>
  );
};

export default BookmarkList;
