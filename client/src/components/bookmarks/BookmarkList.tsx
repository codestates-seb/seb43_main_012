import React from 'react';
import styled from 'styled-components';
import { BookmarkType } from '../../data/dataTypes';
import { BookmarkCheckbox, Bookmark, BookmarkItem } from './BookmarkItem';

import {
  DialogItems,
  SignOutFooter,
  SignoutItem,
} from '../../styles/TopNavStyle';

import GenericCheckbox from '../generic/GenericCheckbox';

type ListProp = {
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
  font-size: 15px;
  font-weight: var(--text-fontweight-medium);
  text-align: center;
  color: var(--color-default-green);

  &:hover {
    color: black;
  }
`;

const BookmarkList = ({ list, handleCheck }: ListProp) => {
  return (
    <>
      <BookmarkItems>
        {list.map((bookmark: BookmarkType) => (
          <BookmarkItem
            key={bookmark.bookmarkId}
            bookmark={bookmark}
            handleCheck={handleCheck}
          />
        ))}
      </BookmarkItems>
      <Footer>
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
        <AddBookmark>Create New List</AddBookmark>
      </Footer>
    </>
  );
};

export default BookmarkList;
