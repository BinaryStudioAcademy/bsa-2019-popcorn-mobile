import React, { Component } from 'react';
import {
	ScrollView,
} from 'react-native';
import styles from '../assets/style';
import PostCompomonent from './../components/MainPage/Post';

const HomeView = ({ navigation }) => (
	<ScrollView contentContainerStyle={styles.container}>
		<PostCompomonent/>
	</ScrollView>
);

export default HomeView;
