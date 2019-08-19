import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';
import { HeaderView } from './Header';

const CollectionsView = ({ navigation }) => (
	<View style={styles.container}>
		<HeaderView navigation={navigation} />
		<View style={styles.container}>
			<Text style={{ marginTop: 50 }}>Collections Screen</Text>
		</View>
	</View>
);

export default CollectionsView;
