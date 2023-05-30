import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Conversation } from '../../data/d';
import { createBookmark } from '../../api/ChatInterfaceApi';
import conversationSlice from '../main/conversationSlice';

export const createEmptyBookmarkAsync = createAsyncThunk(
  'collection/createBookmark',
  async ({ bName }: { bName: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    if (state.collection.status === 'idle') {
      thunkApi.dispatch(collectionSlice.actions.setStatus('loading'));
      const res = await createBookmark({ bName });
      thunkApi.dispatch(collectionSlice.actions.setStatus('idle'));
      return res;
    }
  },
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    collectionContent: {} as any,
    selectedBookmark: 'All',
    selectedTag: '',
    isToggled: false,
    status: 'idle',
  },
  reducers: {
    setCollectionBookmark: (state, action) => {
      // console.log('Collection Bookmark');
      state.selectedBookmark = action.payload;
    },
    setCollectionTag: (state, action) => {
      state.selectedTag = action.payload;
    },
    setCollectionContent: (state, action) => {
      state.collectionContent = action.payload;
    },
    toggleModal: (state, action) => {
      // console.log('toggled show answer status');
      state.isToggled = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  setCollectionBookmark,
  setCollectionContent,
  setCollectionTag,
  toggleModal,
  setStatus,
} = collectionSlice.actions;

export const selectCollectionContent = (state: RootState) =>
  state.collection.collectionContent;

export const selectedCollectionBookmark = (state: RootState) =>
  state.collection.selectedBookmark;

export const selectedCollectionTag = (state: RootState) =>
  state.collection.selectedTag;

export const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
