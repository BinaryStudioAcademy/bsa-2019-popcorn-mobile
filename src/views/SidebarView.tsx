import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Alert, StyleSheet } from 'react-native';
// import styles from '../assets/style';
import GestureRecognizer, {
	swipeDirections
} from 'react-native-swipe-gestures';
import Tabs from '../components/ContentPage/Tabs';
import EventNavigator from '../routes/StackNavigator/EventsNavigator';
import SurveyNavigator from '../routes/StackNavigator/SurveyNavigator';
import ContentPageNavigator from '../routes/TabNavigator/ContentPageNavigator';
import Header from '../components/Header/Header';
class SidebarView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={[styles.container]}>
				<Header navigation={this.props.navigation} />
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
