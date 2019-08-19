import React, { Fragment, Component } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	StatusBar,
	Text,
	Button,
	Image
} from 'react-native';

class HomeComponent extends Component {
	staticNavigationOptions = {
		title: 'Home'
	};
	render() {
		const navigate = this.props.navigation;
		return (
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				horizontal={true}
			>
				<View style={styles.slideItem}>
					<Image
						source={{
							uri:
								'https://m.media-amazon.com/images/M/MV5BMjUyOTE1NjI0OF5BMl5BanBnXkFtZTgwMTM4ODQ5NTM@._V1_.jpg'
						}}
						style={styles.slideImg}
					/>
					<Image
						source={{ uri: 'https://i.pravatar.cc/100' }}
						style={styles.slideAvatar}
					/>
					<Text> This is Home</Text>
				</View>
				<View style={styles.slideItem}>
					<Text> This is Home</Text>
				</View>
				<View style={styles.slideItem}>
					<Text> This is Home</Text>
				</View>
				<View style={styles.slideItem}>
					<Text> This is Home</Text>
				</View>
				<View style={styles.slideItem}>
					<Text> This is Home</Text>
				</View>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	contentContainer: {
		paddingVertical: 20,
		flexDirection: 'row'
	},
	slideItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'aliceblue',
		height: 300,
		width: 200,
		marginRight: 20,
		marginTop: 40
	},
	slideImg: {
		width: 150,
		height: 250,
		marginTop: 10,
		position: 'relative'
	},
	slideAvatar: {
		position: 'absolute',
		width: 30,
		height: 30,
		top: 30,
		left: 40,
		borderRadius: 10
	}
});

export default HomeComponent;
