import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';
import { HeaderView } from './Header';

const MessagesView = ({ navigation }) => (
	<View style={styles.container}>
		<HeaderView navigation={navigation} />
		<View style={styles.container}>
			<Text style={{ marginTop: 50 }}>Messages Screen</Text>
		</View>
	</View>
);

export default MessagesView;
