import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ContentPageNavigator from '../routes/StackNavigator/ContentPageNavigator';
import Header from '../components/Header/Header';
class SidebarView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={[styles.container]}>
				<ContentPageNavigator />
			</View>
		);
	}
}

export default SidebarView;

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
