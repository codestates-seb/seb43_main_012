import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export type UserInfo = {
  userId: number;
  userEmail: string;
  username: string;
  avatarLink: string;
  createdDate: string;
};

export type UserState = {
  loginState: boolean;
  memberInfo: UserInfo;
};

const initialState: UserState = {
  loginState: false,
  memberInfo: {
    userId: 0,
    userEmail: '',
    username: '',
    avatarLink: '',
    createdDate: '',
  },
};

const memberSlice = createSlice({
  name: 'memberInfo',
  initialState,
  reducers: {
    changeLoginState: (state, action: { payload: 'ON' | 'OFF' }) => {
      const type = action.payload;
      switch (type) {
        case 'ON': {
          state.loginState = true;
          break;
        }
        case 'OFF': {
          state.loginState = false;
          break;
        }
        default:
          return;
      }
    },
    updateMemberInfo: (state, action: { payload: UserInfo }) => {
      console.log('reducer memberinfo: was this done?');
      console.log(action.payload);
      state.memberInfo = action.payload;
    },
  },
});

export const selectLoginState = (state: RootState) => state.member.loginState;
export const selectMemberInfo = (state: RootState) => state.member.memberInfo;
export const { changeLoginState, updateMemberInfo } = memberSlice.actions;
export default memberSlice.reducer;
