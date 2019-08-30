import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import styles from '../assets/style';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import PostComponent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/';
const HomeView = ({ navigation }) => (
	<ParallaxScrollView
		parallaxHeaderHeight={280}
		backgroundColor="#FFFFFF"
		contentBackgroundColor="#FFFFFF"
		renderForeground={() => (
			<View style={{ marginVertical: 20 }}>
				<StoryComponent navigation={navigation} />
			</View>
		)}
	>
		<View style={{ flex: 1 }}>
			<PostComponent />
		</View>
	</ParallaxScrollView>
);

export default HomeView;
