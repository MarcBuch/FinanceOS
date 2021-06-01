import { AnyAction } from 'redux';
import { Constants } from '../types';

const initialState = {
  id: '',
  token: '',
  expiresIn: '',
};

export default function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case Constants.LOGIN_USER:
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
        expiresIn: action.payload.expiresIn,
      };
    default:
      return state;
  }
}
