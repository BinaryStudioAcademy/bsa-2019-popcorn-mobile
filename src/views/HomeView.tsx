import React, { Component } from 'react';
import {
	ScrollView,
} from 'react-native';
import styles from '../assets/style';
import PostCompomonent from './../components/MainPage/Post/';
import StoryComponent from './../components/MainPage/Story/'
const HomeView = ({ navigation }) => (
	<ScrollView contentContainerStyle={styles.container}>
		<StoryComponent navigation={navigation}/>
		<PostCompomonent/>
	</ScrollView>
);

export default HomeView;
