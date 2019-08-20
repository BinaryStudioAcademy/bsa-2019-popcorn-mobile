import React from 'react';
import Swiper from 'react-native-swiper';
import SidebarView from '../../views/SidebarView';
import { HomeNavigator } from '../../routes/';
import { View } from 'react-native';

const Main: React.FC = () => {
	return (
		<View style={{flex: 1}}>
		<Swiper loop={false} showsPagination={false} index={0}>
			<HomeNavigator />
			<SidebarView />
		</Swiper>
		</View>
	);
};

export default Main;
