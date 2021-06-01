import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';

import RootReducer from './reducers/index';

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk.withExtraArgument(axios)),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
