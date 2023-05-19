import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {
  Conversation,
  BookmarkType,
  TagType,
  initialConvData,
} from '../../data/d';

import { saveBookmark, deleteBookmark } from '../../api/ChatInterfaceApi';

export type ConversationState = {
  cId: number;
  content: Conversation;
  cTitle: string;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: ConversationState = {
  cId: -1,
  cTitle: '',
  content: initialConvData,
  status: 'idle',
};

// Create an async thunk for adding a bookmark
export const addBookmarkAsync = createAsyncThunk(
  'conversation/addBookmark',
  async ({ cId, bId, bName }: { cId: number; bId: number; bName: string }) => {
    const res = await saveBookmark({ cId, bName });
    return res;
  },
);

// Create an async thunk for deleting a bookmark
export const deleteBookmarkAsync = createAsyncThunk(
  'conversation/deleteBookmark',
  async ({ cId, bId }: { cId: number; bId: number }) => {
    const res = await deleteBookmark({ cId, bId });
    return res;
  },
);

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversation: (state, action) => {
      console.log('reducer: set conversation');
      state.content = action.payload;
      state.cId = action.payload.conversationId;
      state.cTitle = action.payload.title;
    },

    changeQnASaveStatus: (
      state,
      action: { payload: { id: number; newCheckValue: boolean } },
    ) => {
      console.log('reducer: change qna save status');
      const { id, newCheckValue } = action.payload;
      const qnaList = state.content.qnaList;

      const updatedQnAList = qnaList
        .map((qna) => {
          if (qna.qnaId === id) {
            return { ...qna, bookmarkStatus: newCheckValue };
          }
          return qna;
        })
        .sort((a, b) => a.qnaId - b.qnaId);

      state.content.qnaList = updatedQnAList;
    },

    changeTitle: (state, action: { payload: string }) => {
      console.log('reducer: edit title');
      state.content.title = action.payload;
      state.cTitle = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add the logic for handling the async thunks
    builder
      .addCase(addBookmarkAsync.fulfilled, (state, action) => {
        const { bId } = action.meta.arg;
        const newBookmarkName = state.content.bookmarkList.find(
          (b) => b.bookmarkId === bId,
        )?.bookmarkName;
        if (newBookmarkName) {
          const newBookmarks: BookmarkType[] = [
            { bookmarkId: bId, bookmarkName: newBookmarkName },
            ...state.content.bookmarks,
          ];
          const newUncheckedBookmarks: BookmarkType[] =
            state.content.bookmarkList.filter((b) => b.bookmarkId !== bId);
          state.content.bookmarks = newBookmarks;
          state.content.bookmarkList = newUncheckedBookmarks;
          console.log('bookmark added:', action.payload);
        }
      })
      .addCase(deleteBookmarkAsync.fulfilled, (state, action) => {
        const { bId } = action.meta.arg;
        const newBookmarks: BookmarkType[] = state.content.bookmarks.filter(
          (b) => b.bookmarkId !== bId,
        );
        const uncheckedName = state.content.bookmarks.find(
          (b) => b.bookmarkId === bId,
        )?.bookmarkName;
        if (uncheckedName) {
          const newUncheckedBookmarks: BookmarkType[] = [
            { bookmarkId: bId, bookmarkName: uncheckedName },
            ...state.content.bookmarkList,
          ];
          state.content.bookmarkList = newUncheckedBookmarks;
        }
        state.content.bookmarks = newBookmarks;
        console.log('bookmark deleted:', bId);
      });
  },
});

export const selectConversation = (state: RootState) =>
  state.conversation.content;

export const selectCId = (state: RootState) => state.conversation.cId;

export const selectCTitle = (state: RootState) => state.conversation.cTitle;

export const { setConversation, changeQnASaveStatus, changeTitle } =
  conversationSlice.actions;

export default conversationSlice.reducer;
