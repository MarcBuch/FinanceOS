import store from '../redux/store';

import userActions from '../redux/actions/userActions';

// Use real redux store

describe('Redux: Actions', () => {
  it('log in a user', () => {
    store.dispatch(userActions.loginUser('marc', '12345'));
    console.log(store.getState());
  });
});
