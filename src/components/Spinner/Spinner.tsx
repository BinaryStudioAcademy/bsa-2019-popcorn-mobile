import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Spinner = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#ff6501" />
		</View>
	);
};

export default Spinner;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 9,
		backgroundColor: 'rgba(255,255,255,0.7)'
	}
});
