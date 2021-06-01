import { combineReducers } from 'redux';

import userReducer from './userReducer';
import statisticReducer from './statisticReducer';

const RootReducer = combineReducers({
  user: userReducer,
  statistic: statisticReducer,
});

export default RootReducer;
