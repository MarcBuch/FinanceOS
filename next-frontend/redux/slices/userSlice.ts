import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import fetchUserToken from '../actions/userActions';
import { IUser } from '../types';

interface IUserState {
  loading: boolean;
  userId: string;
  token: string;
  expiresIn: string;
}

const initialState: IUserState = {
  loading: true,
  userId: '',
  token: '',
  expiresIn: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserToken.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(fetchUserToken.fulfilled, (state, action) => {
      return {
        loading: false,
        userId: action.payload.userId,
        token: action.payload.token,
        expiresIn: action.payload.expiresIn,
      };
    });
  },
});

export const selectUserState = (state: RootState): IUserState => state;

export const selectUser = (state: RootState): IUser => ({
  userId: state.userId,
  token: state.token,
  expiresIn: state.expiresIn,
});

export default userSlice.reducer;
