import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { HomeNavigator } from './../../routes/';
import Swiper from 'react-native-swiper';
import StoryComponent from './../../components/MainPage/Story/index';
import HomeComponent from './../../views/HomeView';
import SidebarView from './../../views/SidebarView';
import Spinner from './../../components/Spinner/Spinner';
import App from '../Root';

interface IProps {
	store: Store;
}

class Root extends Component<IProps> {
	render() {
		return (
			<Provider store={this.props.store}>
				<App />
			</Provider>
		);
	}
}

export default Root;
