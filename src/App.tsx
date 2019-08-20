import { HomeNavigator } from './routes/';
import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeComponent from './views/HomeView';
import Swiper from 'react-native-swiper';
import SidebarView from './views/SidebarView';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	StatusBar
} from 'react-native';
import styles from '../assets/style';

import Header from './components/Header/Header';
import Spinner from './components/Spinner/Spinner';
export default class App extends Component {
	render() {
		return (
			<Swiper loop={false} showsPagination={false} index={0}>
				{/* <Spinner /> */}
				<HomeNavigator />
				<SidebarView />
			</Swiper>
		);
	}
}

export default App;
