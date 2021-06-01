import { AnyAction } from 'redux';
import { Constants } from '../types';

const initialState = {
  userID: 0,
  totalIncome: 0,
  totalExpenses: 0,
  totalExpensesWithSavings: 0,
  netIncome: 0,
  spendPerTransaction: 0,
  savingsRatio: 0,
  year: 0,
  month: '',
};

export default function statisticReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case Constants.GET_STATISTIC:
      return {
        ...state,
        userID: action.payload.user_id,
        month: action.payload.month,
      };
    default:
      return state;
  }
}
