import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider, connect } from 'react-redux';
import { ModalWrapper, show, reducer as modal } from '../src/index';

const mockStore = configureStore();

describe('WrappedModal tests', () => {
  let store;
  beforeEach(() => {
    const initialState = { modal };
    store = mockStore(initialState);
  });

  it('Displays the ModalWrapper', () => {
    const ModalBody = <h1>Hello From Modal!</h1>;
    const Container = ({ showDialog }) => (
      <div>
        <button onClick={showDialog}>Click</button>
        <ModalWrapper name="my-modal" component={ModalBody} />
      </div>
    );

    Container.propTypes = {
      showDialog: PropTypes.func.isRequired
    };

    const ConnectedContainer = connect(null, dispatch => ({
      showDialog: () => dispatch(show('my-modal', { title: 'modal-title' }))
    }))(Container);

    const wrapper = mount(<Provider store={store}><ConnectedContainer /></Provider>);

    // Simulate button click
    wrapper.find('button').simulate('click');
    const actions = store.getActions().map(action => action.type);
    expect(actions.length).toEqual(1);
    expect(actions[0]).toEqual('@redux-modal/SHOW');

    expect(wrapper.find(ModalBody)).toBeDefined();
  });
});

