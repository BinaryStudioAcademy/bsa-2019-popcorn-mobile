import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';
import MovieComponent from './../components/MainPage/Movie';

const MovieListView = ({ navigation }) => (
	<View style={styles.container}>
		<View style={styles.container}>
			<MovieComponent/>
		</View>
	</View>
);

export default MovieListView;
