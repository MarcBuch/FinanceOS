import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUserToken = createAsyncThunk(
  'user/fetchUserToken',
  async (userData: { username: string; password: string }, thunkAPI) => {
    const { username, password } = userData;

    try {
      const response = await axios.post(
        'http://financeos:30002/api/auth/login',
        { username, password }
      );
      const { userID, expiresIn } = response.data;
      const { token } = response.data.token;

      return {
        userId: userID,
        token,
        expiresIn,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export default fetchUserToken;
