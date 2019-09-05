import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';

const mockMessages = [
	{
		mesId: 1,
		mesBody: 'Message',
		mesFrom: { id: '1', name: 'Victor' }
	}
];

const MessagesView = ({ navigation }) => (
	<View style={styles.container}>
		<View style={styles.container}>
			<Text style={{ marginTop: 50 }}>Messages Screen</Text>
		</View>
	</View>
);

export default MessagesView;
