import React, { Component } from 'react';
import {
	ScrollView,
	View
} from 'react-native';
import styles from '../assets/style';
import PostCompomonent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/'
const HomeView = ({ navigation }) => (
	<ScrollView contentContainerStyle={styles.container}>
		<View style={{ marginBottom: 20 }}>
			<StoryComponent navigation={navigation} />
		</View>
		<PostCompomonent />
	</ScrollView>
);

export default HomeView;
