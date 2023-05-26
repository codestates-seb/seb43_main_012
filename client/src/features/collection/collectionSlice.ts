import { createSlice } from '@reduxjs/toolkit';
// import data from '../../data/data.json';
import { Conversation } from '../../data/d';

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    content: {} as any,
    selectedBookmark: 'All',
    selectedTag: '',
    isToggled: false,
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
    toggleModal: (state, action) => {
      console.log('toggle modal');
      state.isToggled = action.payload;
    },
  },
});

export const { setSelectedBookmark, setContent, setSelectedTag, toggleModal } =
  collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
