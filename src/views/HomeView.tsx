import React, { Component } from 'react';
import {
	ImageBackground,
	ScrollView,
	View,
	Text,
	Button,
	Image
} from 'react-native';
import styles from '../assets/style';
import { RightDrawer } from '../routes/RightDrawer';
import Swiper from 'react-native-swiper';
import SidebarView from './SidebarView';

const HomeView = ({ navigation }) => (
	<ScrollView contentContainerStyle={styles.container}>
		<Text style={styles.home_title}>Post</Text>
		<Image
			source={{
				uri:
					'https://images-gmi-pmc.edge-generalmills.com/33b7f0bf-2845-4200-a781-7a8ccc4bd10e.jpg'
			}}
			style={styles.homeImg}
		/>
		<Text style={styles.home_title}>Post</Text>
		<Image
			source={{
				uri:
					'https://images-gmi-pmc.edge-generalmills.com/33b7f0bf-2845-4200-a781-7a8ccc4bd10e.jpg'
			}}
			style={styles.homeImg}
		/>
	</ScrollView>
);

export default HomeView;
