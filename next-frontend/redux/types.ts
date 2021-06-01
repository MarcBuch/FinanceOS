export interface IUser {
  id: string;
  token: string;
  expiresIn: string;
}

export interface ITransaction {
  userID: string;
  year: number;
  month: string;
  type: string;
  amount: number;
  category: string;
  subcategory: string;
}

export interface IStatistic {
  userID: number;
  totalIncome: number;
  totalExpenses: number;
  totalExpensesWithSavings: number;
  netIncome: number;
  spendPerTransaction: number;
  savingsRatio: number;
  year: number;
  month: string;
}

export interface IAction {
  type: Constants;
  payload: IUser | ITransaction | IStatistic;
}

export interface IAppState {
  user: IUser;
  transactions: ITransaction[] | [];
  statistic: IStatistic;
}

export const initialState = {
  user: {} as IUser,
  transactions: [],
  statistic: {} as IStatistic,
};

export enum Constants {
  LOGIN_USER = 'LOGIN_USER',
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  EDIT_TRANSACTION = 'EDIT_TRANSACTION',
  GET_STATISTIC = 'GET_STATISTIC',
}
