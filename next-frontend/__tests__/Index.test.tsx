import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../redux/store';
import IndexPage from '../pages/index';

describe('Page: Index', () => {
  const wrapper = mount(
    <Provider store={store}>
      <IndexPage />
    </Provider>
  );

  it('should create the component', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should have a title', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });
});
