import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { HomeNavigator } from './../../routes/';
import Swiper from 'react-native-swiper';
import StoryComponent from './../../components/MainPage/Story/index';
import HomeComponent from './../../views/HomeView';
import SidebarView from './../../views/SidebarView';
import Spinner from './../../components/Spinner/Spinner';

interface IProps {
	store: Store;
}

class Root extends Component<IProps> {
	render() {
		return (
			<Provider store={this.props.store}>
				<Swiper loop={false} showsPagination={false} index={0}>
					{/* <Spinner /> */}
					<HomeNavigator />
					<SidebarView />
				</Swiper>
			</Provider>
		);
	}
}

export default Root;
