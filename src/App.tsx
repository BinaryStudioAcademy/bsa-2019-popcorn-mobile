import React, { Component } from 'react';
import Root from './containers/Root';
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends Component {
	render() {
		return (
      <Provider store={store}>
			  <Root/>
      </Provider>
		);
	}
}
