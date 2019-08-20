import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Alert } from 'react-native';
import styles from '../assets/style';
import GestureRecognizer, {
	swipeDirections
} from 'react-native-swipe-gestures';

class SidebarView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.sidebar}>
				<Text style={styles.sidebar_title}>Tops</Text>
				<Image
					source={{
						uri:
							'https://blog.radware.com/wp-content/uploads/2016/12/popcorn-time.jpg'
					}}
					style={styles.rightSideBarImg}
				/>
				<Text style={styles.sidebar_title}>Surveys</Text>
				<Image
					source={{
						uri:
							'https://blog.radware.com/wp-content/uploads/2016/12/popcorn-time.jpg'
					}}
					style={styles.rightSideBarImg}
				/>
			</View>
		);
	}
}

export default SidebarView;
