import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';

const MovieListView = ({ navigation }) => (
	<View style={styles.container}>
		<View style={styles.container}>
			<Text style={{ marginTop: 50 }}>Movie list Screen</Text>
		</View>
	</View>
);

export default MovieListView;
