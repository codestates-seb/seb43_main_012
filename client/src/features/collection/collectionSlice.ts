import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";

interface CollectionState {
  content: {
    chat: {
      id: number;
      title: string;
      content: string;
      user: {
        id: number;
        name: string;
      };
      bookmark: string;
      tags: string[];
      fixed: boolean;
    }[];
    bookmark: string[];
    tags: string[];
  };
  selectedBookmark: string;
}

const collectionSlice = createSlice({
  name: "collection",
  initialState: {
    content: data,
    selectedBookmark: "",
  } as CollectionState,
  reducers: {
    setSelectedBookmark: (state, action) => {
      state.selectedBookmark = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setSelectedBookmark, setContent } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
export default collectionReducer;
