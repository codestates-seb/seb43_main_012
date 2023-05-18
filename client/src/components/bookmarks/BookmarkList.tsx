import React, { useState } from 'react';

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

type ListProp = {
  // isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  list: BookmarkType[];
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

const BookmarkList = ({ list, handleCheck, setIsModalOpen }: ListProp) => {
  const handleModalOpen = () => {
    console.log('create bookmark modal open!');
    setIsModalOpen(true);
  };
  return (
    <>
      {Boolean(list.length) && (
        <BookmarkItems>
          {list.map((bookmark: BookmarkType) => (
            <BookmarkItem
              key={bookmark.bookmarkId}
              bookmark={bookmark}
              handleCheck={handleCheck}
            />
          ))}
        </BookmarkItems>
      )}
      <Footer>
        {Boolean(list.length) && (
          <Options>
            <Option>
              <BookmarkCheckbox>
                <GenericCheckbox size="small" />
              </BookmarkCheckbox>
              <div>Pin</div>
            </Option>
            <Option>
              <BookmarkCheckbox>
                <GenericCheckbox size="small" />
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
