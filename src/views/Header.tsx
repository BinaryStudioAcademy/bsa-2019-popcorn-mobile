import React from 'react';
import styles from '../assets/style';
import { View, Text, Button } from 'react-native';

export const HeaderView = ({ navigation }) => (
	<View style={styles.header}>
		<Button title="&#8904;" onPress={() => navigation.toggleDrawer()} />
		<Text>Header</Text>
		<Button title="&#8904;" onPress={() => navigation.toggleRightDrawer()} />
	</View>
);
