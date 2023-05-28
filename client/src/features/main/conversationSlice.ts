import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {
  Conversation,
  BookmarkType,
  TagType,
  initialConvData,
} from '../../data/d';

import {
  saveBookmark,
  deleteBookmark,
  updatePinState,
  addTag,
  deleteTag,
} from '../../api/ChatInterfaceApi';

export type ConversationState = {
  cId: number;
  content: Conversation;
  cTitle: string;
  status: 'idle' | 'loading' | 'failed';
};

export const initialState: ConversationState = {
  cId: -1,
  cTitle: '',
  content: initialConvData,
  status: 'idle',
};

// Create an async thunk for adding a bookmark
export const addBookmarkAsync = createAsyncThunk(
  'conversation/addBookmark',
  async ({ bId, bName }: { bId: number; bName: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    if (state.conversation.status === 'idle') {
      thunkApi.dispatch(conversationSlice.actions.setStatus('loading'));
      const cId = state.conversation.content.conversationId;
      const res = await saveBookmark({ cId, bName });
      thunkApi.dispatch(conversationSlice.actions.setStatus('idle'));
      return res;
    }
  },
);

// Create an async thunk for deleting a bookmark
export const deleteBookmarkAsync = createAsyncThunk(
  'conversation/deleteBookmark',
  async ({ bId }: { bId: number }, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    if (state.conversation.status === 'idle') {
      thunkApi.dispatch(conversationSlice.actions.setStatus('loading'));
      const cId = state.conversation.cId;
      await deleteBookmark({ cId, bId });
      thunkApi.dispatch(conversationSlice.actions.setStatus('idle'));
      return;
    }
  },
);

export const createBookmarkAsync = createAsyncThunk(
  'conversation/createBookmark',
  async ({ bName }: { bName: string }, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    if (state.conversation.status === 'idle') {
      thunkApi.dispatch(conversationSlice.actions.setStatus('loading'));
      const cId = state.conversation.cId;
      const res = await saveBookmark({ cId, bName });
      thunkApi.dispatch(conversationSlice.actions.setStatus('idle'));
      return res;
    }
  },
);

export const updatePinAsync = createAsyncThunk(
  'conversation/updatePin',
  async ({ value }: { value: boolean }, thunkApi) => {
    // console.log('test: updating pin: ', value);
    const state = thunkApi.getState() as RootState;
    if (state.conversation.status === 'idle') {
      thunkApi.dispatch(conversationSlice.actions.setStatus('loading'));
      const cId = state.conversation.cId;
      await updatePinState({ cId, value });
      thunkApi.dispatch(conversationSlice.actions.setStatus('idle'));
      return;
    }
  },
);

export const addTagAsync = createAsyncThunk(
  'conversation/addTag',
  async ({ tName }: { tName: string }, thunkApi) => {
    // console.log('test: add tag');
    const state = thunkApi.getState() as RootState;
    // console.log('test: ', state.conversation.status);

    if (state.conversation.status === 'idle') {
      thunkApi.dispatch(conversationSlice.actions.setStatus('loading'));
      const cId = state.conversation.cId;
      const res = await addTag({ cId, tName });
      thunkApi.dispatch(conversationSlice.actions.setStatus('idle'));
      return res;
    }
  },
);

export const deleteTagAsync = createAsyncThunk(
  'conversation/deleteTag',
  async ({ tId }: { tId: number }, thunkApi) => {
    // console.log('test: delete tag');
    const state = thunkApi.getState() as RootState;
    if (state.conversation.status === 'idle') {
      thunkApi.dispatch(conversationSlice.actions.setStatus('loading'));
      const cId = state.conversation.cId;
      await deleteTag({ cId, tId });
      thunkApi.dispatch(conversationSlice.actions.setStatus('idle'));
      return;
    }
  },
);

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    initializeConversation: (state, action: { payload: number }) => {
      console.log('initializing conversation!');
      state.content = initialConvData;
      state.cId = action.payload;
      (state.cTitle = ''), (state.status = 'idle');
    },

    setConversation: (state, action) => {
      // console.log('reducer: set conversation');
      state.content = action.payload;
      state.cId = action.payload.conversationId;
      state.cTitle = action.payload.title;
    },

    changeQnASaveStatus: (
      state,
      action: { payload: { id: number; newCheckValue: boolean } },
    ) => {
      // console.log('reducer: change qna save status');
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
      // console.log('reducer: edit title');
      state.content.title = action.payload;
      state.cTitle = action.payload;
    },

    //when adding new bookmark
    updateBookmarks: (
      state,
      action: { payload: { bId: number; bName: string } },
    ) => {
      const { bId, bName } = action.payload;
      // console.log('reducer: update bookmark');

      const allBookmarks = [
        ...state.content.bookmarks.map((b) => b.bookmarkName),
        ...state.content.bookmarkList.map((b) => b.bookmarkName),
      ];

      if (!allBookmarks.includes(bName)) {
        state.content.bookmarks = [
          { bookmarkId: bId, bookmarkName: bName },
          ...state.content.bookmarks,
        ];
      } else {
        //just add to checked list, remove from unchecked list
        state.content.bookmarks = [
          { bookmarkId: bId, bookmarkName: bName },
          ...state.content.bookmarks,
        ];
        state.content.bookmarkList = state.content.bookmarkList.filter(
          (b) => b.bookmarkId !== bId,
        );
      }
    },

    updateTags: (
      state,
      action: {
        payload: { tId?: number; tName?: string; type: 'ADD' | 'DELETE' };
      },
    ) => {
      const { tId, tName, type } = action.payload;

      switch (type) {
        case 'ADD': {
          if (tId && tName) {
            state.content.tags = [
              ...state.content.tags,
              { tagId: tId, tagName: tName },
            ];
          }
          break;
        }
        case 'DELETE': {
          if (tId) {
            state.content.tags = state.content.tags.filter(
              (t) => t.tagId !== tId,
            );
          }
          break;
        }
        default:
          return;
      }
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
          //if there was no bookmarks before, then change to saved
          if (!state.content.bookmarks.length) {
            // console.log('must change saved to true');
            state.content.saved = true;
          }
          state.content.bookmarks = newBookmarks;
          state.content.bookmarkList = newUncheckedBookmarks;

          // console.log('bookmark added:', action.payload);
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
        if (state.content.bookmarks.length <= 1) {
          // console.log('must change saved to false');
          state.content.saved = false;
        }
        state.content.bookmarks = newBookmarks;

        // console.log('bookmark deleted:', bId);
      })
      .addCase(updatePinAsync.fulfilled, (state, action) => {
        const { value } = action.meta.arg;
        state.content.pinned = value;
      });
  },
});

export const selectConversation = (state: RootState) =>
  state.conversation.content;

export const selectCId = (state: RootState) => state.conversation.cId;

export const selectCTitle = (state: RootState) => state.conversation.cTitle;

export const {
  initializeConversation,
  setConversation,
  changeQnASaveStatus,
  changeTitle,
  updateBookmarks,
  updateTags,
} = conversationSlice.actions;

export default conversationSlice.reducer;
