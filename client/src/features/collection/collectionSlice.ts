import { createSlice } from '@reduxjs/toolkit';
// import data from '../../data/data.json';
import { Conversation } from '../../data/d';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    content: {} as any,
    selectedBookmark: 'All',
    selectedTag: '',
  },
  reducers: {
    setSelectedBookmark: (state, action) => {
      state.selectedBookmark = action.payload;
    },
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setSelectedBookmark, setContent, setSelectedTag } =
  collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
