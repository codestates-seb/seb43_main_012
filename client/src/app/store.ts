import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { collectionReducer } from '../features/collection/collectionSlice';
import conversationReducer from '../features/main/conversationSlice';
import memberReducer from '../features/member/loginInfoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    collection: collectionReducer,
    conversation: conversationReducer,
    member: memberReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type CustomThunkAPI = {
  dispatch: AppDispatch;
  getState: () => RootState;
};
