import Router from './routes/';
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeComponent from './views/HomeView';
import Page1 from './views/SidebarView';
import Swiper from 'react-native-swiper';
import SidebarView from './views/SidebarView';

export default class CustomDrawer extends Component {
	render() {
		return (
			<Swiper loop={false} showsPagination={false} index={0}>
				<Router />
				<SidebarView />
			</Swiper>
		);
	}
}
