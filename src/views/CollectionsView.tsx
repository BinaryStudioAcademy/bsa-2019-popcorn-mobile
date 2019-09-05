import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../assets/style';

class CollectionsView extends Component  {
	render () {
		return (
			<View style={styles.container}>
				<View style={styles.container}>
					<Text style={{ marginTop: 50 }}>Collections Screen</Text>
				</View>
			</View>
		);
	}
}

export default CollectionsView;
