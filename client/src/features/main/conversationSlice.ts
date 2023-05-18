import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {
  Conversation,
  BookmarkType,
  TagType,
  initialConvData,
} from '../../data/d';

export type ConversationState = {
  cId: number;
  content: Conversation;
  bookmarks: BookmarkType[];
  tags: TagType[];
};

const initialState: ConversationState = {
  cId: -1,
  content: initialConvData,
  bookmarks: [],
  tags: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversation: (state, action) => {
      console.log('reducer: set conversation');
      state.content = action.payload;
      state.cId = action.payload.conversationId;
      state.bookmarks = action.payload.bookmarks;
      state.tags = action.payload.tags;
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

    editTitle: (state, action) => {
      console.log('reducer: edit title');
    },
    // changeQnASaveStatus: (
    //   state,
    //   action: { payload: { id: number; newCheckValue: boolean } },
    // ) => {
    //   const qnaToChange = state.content.qnaList.find(
    //     (qna) => qna.qnaId === action.payload.id,
    //   );
    //   if (qnaToChange) {
    //     const updatedQnA = {
    //       ...qnaToChange,
    //       bookmarkStatus: action.payload.newCheckValue,
    //     };
    //     const updatedQnAList = [
    //       ...state.content.qnaList.filter(
    //         (qna) => qna.qnaId !== action.payload.id,
    //       ),
    //       updatedQnA,
    //     ].sort((a, b) => a.qnaId - b.qnaId);

    //     state.content.qnaList = updatedQnAList;
    //   }
    // },
  },
});

export const selectConversation = (state: RootState) =>
  state.conversation.content;

export const selectCId = (state: RootState) => state.conversation.cId;

export const selectCBookmarks = (state: RootState) =>
  state.conversation.bookmarks;

export const selectCTags = (state: RootState) => state.conversation.tags;

export const { setConversation, changeQnASaveStatus } =
  conversationSlice.actions;

export default conversationSlice.reducer;
