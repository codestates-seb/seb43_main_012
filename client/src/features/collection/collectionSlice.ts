import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Conversation } from '../../data/d';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    collectionContent: {} as any,
    selectedBookmark: 'All',
    selectedTag: '',
    isToggled: false,
  },
  reducers: {
    setCollectionBookmark: (state, action) => {
      state.selectedBookmark = action.payload;
    },
    setCollectionTag: (state, action) => {
      state.selectedTag = action.payload;
    },
    setCollectionContent: (state, action) => {
      state.collectionContent = action.payload;
    },
    toggleModal: (state, action) => {
      state.isToggled = action.payload;
    },
  },
});

export const {
  setCollectionBookmark,
  setCollectionContent,
  setCollectionTag,
  toggleModal,
} = collectionSlice.actions;

export const selectCollectionContent = (state: RootState) =>
  state.collection.collectionContent;

export const selectedCollectionBookmark = (state: RootState) =>
  state.collection.selectedBookmark;

export const selectedCollectionTag = (state: RootState) =>
  state.collection.selectedTag;

export const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
