import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';
import { HeaderView } from './Header';

const EventsView = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<HeaderView navigation={navigation} />
			<View style={styles.container}>
				<Text style={{ marginTop: 50 }}>Events Screen</Text>
			</View>
		</View>
	);
};

export default EventsView;
